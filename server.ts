import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type SafeAiMode = 'sick-note-redaction' | 'incident-triage' | 'youth-router';

interface SafeAiRequestBody {
  mode?: SafeAiMode;
  inputText?: string;
  contextLabel?: string;
}

const SYSTEM_INSTRUCTIONS: Record<SafeAiMode, string> = {
  'sick-note-redaction':
    'You are a clinical privacy assistant at Dunwell Youth Priority Clinic. Convert raw clinician notes into: (1) an Employer-Safe HR Sick Note summary that strictly omits medical diagnoses, prescriptions, and personal clinical history, stating only functional work status and recommended rest days; and (2) clear plain-language recovery guidance for the patient. Always mark requiresClinicianSignOff=true. Keep outputs concise (under 90 words per field).',
  'incident-triage':
    'You are an occupational health triage assistant at Dunwell Youth Priority Clinic. Given a construction or industrial site incident report, draft a concise nurse preparation checklist: recommended vitals/assessments, suggested trauma/first-aid supplies from Pharmacy, and urgency level. Never prescribe medication or finalize a diagnosis; mark everything as a draft awaiting nurse/clinician sign-off.',
  'youth-router':
    'You are a youth-friendly digital intake router for Dunwell Youth Priority Clinic. Given a young person’s short message, recommend whether they fit Virtual Tele-Consult or In-Clinic Priority, identify the best clinic service category, and check for emergency red flags (chest pain, severe bleeding, suicidal crisis, difficulty breathing). Never diagnose or prescribe; keep tone warm, confidential, and brief.',
};

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/safe-ai/assist', async (req, res) => {
    const body = req.body as SafeAiRequestBody;
    const mode = body.mode;
    const inputText = (body.inputText || '').trim();
    const contextLabel = (body.contextLabel || '').trim();

    if (!mode || !SYSTEM_INSTRUCTIONS[mode]) {
      res.status(400).json({ error: 'Invalid Safe AI automation mode.' });
      return;
    }

    if (!inputText) {
      res.status(400).json({ error: 'Please provide clinical or intake text to process.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(503).json({
        error:
          'GEMINI_API_KEY is not configured yet. Add your Gemini API key in Settings > Secrets to run live Safe AI drafting.',
      });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = contextLabel
        ? `Context: ${contextLabel}\n\nInput:\n${inputText}`
        : `Input:\n${inputText}`;

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTIONS[mode],
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              draftOutput: {
                type: Type.STRING,
                description:
                  'Primary structured draft (Employer-safe HR wording, Nurse triage prep list, or Youth service recommendation).',
              },
              patientGuidance: {
                type: Type.STRING,
                description:
                  'Plain-language guidance for the patient or safety officer while awaiting clinician sign-off.',
              },
              suggestedServiceOrAction: {
                type: Type.STRING,
                description:
                  'Recommended clinic workflow action (e.g. Off-Duty 3 Days, Mobile Nurse Dispatch, or Virtual Tele-Consult).',
              },
              urgencyFlag: {
                type: Type.STRING,
                description: 'One of: Routine, Priority, or Urgent Escalation.',
              },
              privacyGuardrailsApplied: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description:
                  'List of 3 specific clinical safety and privacy guardrails enforced on this draft.',
              },
            },
          },
        },
      });

      const rawText = (response.text || '{}').trim();
      const parsed = JSON.parse(rawText);
      res.json({
        ...parsed,
        requiresClinicianSignOff: true,
        modelUsed: 'gemini-4-hydrogen',
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to generate Safe AI clinical draft.';
      res.status(502).json({
        error: `Safe AI generation failed: ${message}`,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Dunwell IT Strategy & Demo server running on http://0.0.0.0:${port}`);
  });
}

startServer();
