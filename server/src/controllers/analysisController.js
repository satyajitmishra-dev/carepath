import { GoogleGenerativeAI } from '@google/generative-ai';

const RESPONSE_CACHE_TTL_MS = 5 * 60 * 1000;
const analysisCache = new Map();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function getCachedAnalysis(key) {
  const entry = analysisCache.get(key);

  if (!entry) {
    return null;
  }

  if (Date.now() - entry.timestamp > RESPONSE_CACHE_TTL_MS) {
    analysisCache.delete(key);
    return null;
  }

  return entry.data;
}

function setCachedAnalysis(key, data) {
  analysisCache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

const SYSTEM_PROMPT = `You are a medical triage assistant helping patients navigate to the right specialist.
A user reports the following symptoms. Analyze them and return ONLY a valid JSON object with these exact fields:

{
  "possibleConditions": ["array of 2-3 possible (not definitive) medical conditions"],
  "specialistType": "exact specialist type (e.g. 'Neurologist', 'Cardiologist', 'Dermatologist', 'Orthopedic Surgeon', 'ENT Specialist', 'Gastroenterologist', 'Ophthalmologist', 'General Physician')",
  "urgencyLevel": "exactly one of: 'Emergency', 'Urgent', or 'Routine'",
  "urgencyReason": "one sentence explaining the urgency level",
  "searchQuery": "a Google Maps search string (e.g. 'neurologist near me Kolkata')",
  "disclaimer": "a short safety disclaimer reminding user this is not a diagnosis",
  "inputQuality": "one of: 'valid', 'vague', or 'invalid'"
}

IMPORTANT RULES:
1. Return ONLY the JSON. No markdown, no explanation, no extra text.
2. NEVER provide a medical diagnosis. Only suggest specialist types.
3. For ANY symptoms involving chest pain, difficulty breathing, severe bleeding, loss of consciousness, or stroke symptoms: ALWAYS set urgencyLevel to "Emergency".
4. The disclaimer MUST always say this is not a medical diagnosis.
5. If the input is gibberish, non-medical, or too vague, set inputQuality accordingly and still return valid JSON.
6. specialistType must be one of: Cardiologist, Neurologist, Dermatologist, Orthopedic Surgeon, ENT Specialist, Gastroenterologist, Ophthalmologist, General Physician.`;

export async function analyzeSymptoms(req, res) {
  try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Please describe at least one symptom (minimum 3 characters)',
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'API key not configured. Please set GEMINI_API_KEY in .env file.',
      });
    }

    const normalizedSymptoms = symptoms.trim().toLowerCase();
    const cachedResponse = getCachedAnalysis(normalizedSymptoms);

    if (cachedResponse) {
      return res.json(cachedResponse);
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.3,
        maxOutputTokens: 1000,
      },
    });

    const prompt = `${SYSTEM_PROMPT}\n\nUser symptoms: ${symptoms.trim()}`;

    let result;
    const maxAttempts = 2;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        result = await model.generateContent(prompt);
        break;
      } catch (generationError) {
        const isRateLimited = generationError?.status === 429;
        const isRetriable = generationError?.status === 503;

        if (attempt === maxAttempts || (!isRateLimited && !isRetriable)) {
          throw generationError;
        }

        await sleep(1200 * attempt);
      }
    }

    const responseText = result.response.text();

    // Strip markdown code fences if any
    let cleanJson = responseText
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/g, '')
      .trim();

    // Parse JSON
    let parsed;
    try {
      parsed = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error('Failed to parse AI response:', cleanJson);
      return res.status(500).json({
        success: false,
        message: 'AI returned an invalid response. Please try again.',
      });
    }

    // Validate required fields
    const requiredFields = [
      'possibleConditions',
      'specialistType',
      'urgencyLevel',
      'urgencyReason',
      'searchQuery',
      'disclaimer',
    ];

    for (const field of requiredFields) {
      if (!parsed[field]) {
        console.error(`Missing field in AI response: ${field}`);
        return res.status(500).json({
          success: false,
          message: 'AI response is incomplete. Please try again.',
        });
      }
    }

    // Validate urgency level
    if (!['Emergency', 'Urgent', 'Routine'].includes(parsed.urgencyLevel)) {
      parsed.urgencyLevel = 'Routine';
    }

    // Handle invalid/vague input
    if (parsed.inputQuality === 'invalid') {
      return res.status(400).json({
        success: false,
        message: 'Please enter valid medical symptoms to get a recommendation.',
      });
    }

    if (parsed.inputQuality === 'vague') {
      return res.status(400).json({
        success: false,
        message: 'Your symptoms are too vague. Please provide more specific details.',
      });
    }

    setCachedAnalysis(normalizedSymptoms, parsed);

    return res.json(parsed);
  } catch (error) {
    console.error('Analysis error:', error);

    if (error.message?.includes('API_KEY_INVALID') || error.status === 401) {
      return res.status(401).json({
        success: false,
        message: 'Invalid API key. Please check your GEMINI_API_KEY.',
      });
    }

    if (error.status === 429) {
      res.set('Retry-After', '30');
      return res.status(429).json({
        success: false,
        message: 'Too many requests from the AI provider. Please wait about 30 seconds and try again.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to analyze symptoms. Please try again.',
    });
  }
}
