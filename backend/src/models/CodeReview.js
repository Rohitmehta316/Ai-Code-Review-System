import mongoose from "mongoose";
const finding = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 180 },
    description: { type: String, required: true, maxlength: 1600 },
    severity: {
      type: String,
      enum: ["critical", "high", "medium", "low", "info"],
      required: true,
    },
    line: { type: Number, min: 1 },
  },
  { _id: false },
);
const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    language: {
      type: String,
      enum: ["javascript", "typescript", "python", "java"],
      required: true,
    },
    sourceCode: { type: String, required: true, maxlength: 100000 },
    summary: { type: String, required: true, maxlength: 3000 },
    qualityScore: { type: Number, required: true, min: 0, max: 100 },
    bugs: { type: [finding], default: [] },
    securityIssues: { type: [finding], default: [] },
    codeQualitySuggestions: { type: [finding], default: [] },
    optimizationSuggestions: { type: [finding], default: [] },
    improvedCode: { type: String, required: true, maxlength: 100000 },
  },
  { timestamps: true, versionKey: false },
);
schema.index({ userId: 1, createdAt: -1 });
export const CodeReview = mongoose.model("CodeReview", schema);
