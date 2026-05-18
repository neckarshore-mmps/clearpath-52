"use server";

import { generateObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import biasesData from "@/data/biases.json";
import { biasAnalysisSchema, type Bias, type BiasAnalysis } from "@/lib/schema";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompt";

const biases = biasesData as Bias[];

export interface AnalysisResult {
  ok: true;
  analysis: BiasAnalysis;
  resolvedBiases: Array<{
    id: string;
    name: string;
    summary: string;
    why: string;
  }>;
}

export interface AnalysisError {
  ok: false;
  error: string;
}

export async function analyzeDecision(
  decision: string,
): Promise<AnalysisResult | AnalysisError> {
  const trimmed = decision.trim();
  if (trimmed.length < 10) {
    return {
      ok: false,
      error: "Please describe the decision in at least a sentence or two.",
    };
  }
  if (trimmed.length > 4000) {
    return {
      ok: false,
      error: "Please keep the decision under 4000 characters.",
    };
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      ok: false,
      error:
        "Server is missing ANTHROPIC_API_KEY. Set it in Vercel environment variables and redeploy.",
    };
  }

  try {
    const { object } = await generateObject({
      model: anthropic("claude-sonnet-4-5"),
      schema: biasAnalysisSchema,
      system: buildSystemPrompt(biases),
      prompt: buildUserPrompt(trimmed),
      temperature: 0.3,
    });

    const byId = new Map(biases.map((b) => [b.id, b]));
    const resolvedBiases = object.topBiases
      .map((tb) => {
        const found = byId.get(tb.id);
        if (!found) return null;
        return {
          id: found.id,
          name: found.name,
          summary: found.summary,
          why: tb.why,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    if (resolvedBiases.length === 0) {
      return {
        ok: false,
        error: "The model returned no recognizable biases. Please try again.",
      };
    }

    return { ok: true, analysis: object, resolvedBiases };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return {
      ok: false,
      error: `Analysis failed: ${msg}`,
    };
  }
}
