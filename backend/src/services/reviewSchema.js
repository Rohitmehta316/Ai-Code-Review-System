import { z } from "zod";
export const findingSchema = z.object({
  title: z.string().trim().min(1).max(180),
  description: z.string().trim().min(1).max(1600),
  severity: z.enum(["critical", "high", "medium", "low", "info"]),
  line: z.number().int().positive().optional(),
});
export const analysisSchema = z.object({
  summary: z.string().trim().min(1).max(3000),
  qualityScore: z.number().int().min(0).max(100),
  bugs: z.array(findingSchema).max(50),
  securityIssues: z.array(findingSchema).max(50),
  codeQualitySuggestions: z.array(findingSchema).max(50),
  optimizationSuggestions: z.array(findingSchema).max(50),
  improvedCode: z.string().max(100000),
});
