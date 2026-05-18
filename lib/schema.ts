import { z } from "zod";

export const biasAnalysisSchema = z.object({
  topBiases: z
    .array(
      z.object({
        id: z
          .string()
          .min(1)
          .max(64)
          .describe(
            "The kebab-case id of the bias from the supplied list, e.g. 'confirmation-bias'.",
          ),
        why: z
          .string()
          .min(20)
          .max(500)
          .describe(
            "One or two sentences explaining specifically why this bias may be at play in the user's decision. Reference the user's wording where possible.",
          ),
      }),
    )
    .length(3)
    .describe("Exactly three biases, ordered most-relevant first."),
  vetoQuestion: z
    .string()
    .min(15)
    .max(250)
    .describe(
      "ONE sharp question (max 25 words) the user should be able to answer before acting. Designed to slow System-1 thinking and engage System-2.",
    ),
});

export type BiasAnalysis = z.infer<typeof biasAnalysisSchema>;

export interface Bias {
  id: string;
  name: string;
  summary: string;
  example: string;
}
