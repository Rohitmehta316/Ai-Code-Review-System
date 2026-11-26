import mongoose from "mongoose";
import { CodeReview } from "../models/CodeReview.js";
import { analyzeCode } from "../services/gemini.js";
const summaryFields =
  "-sourceCode -improvedCode -bugs -securityIssues -codeQualitySuggestions -optimizationSuggestions";
export async function analyzeReview(req, res, next) {
  try {
    const { title, language, sourceCode } = req.body;
    const analysis = await analyzeCode(sourceCode, language);
    const review = await CodeReview.create({
      userId: req.userId,
      title: title || `${language} review · ${new Date().toLocaleDateString()}`,
      language,
      sourceCode,
      ...analysis,
    });
    return res.status(201).json({ review });
  } catch (e) {
    return next(e);
  }
}
export async function listReviews(req, res, next) {
  try {
    const filter = { userId: req.userId };
    if (
      ["javascript", "typescript", "python", "java"].includes(
        req.query.language,
      )
    )
      filter.language = req.query.language;
    const search = String(req.query.search || "")
      .trim()
      .slice(0, 100);
    if (search)
      filter.title = {
        $regex: search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        $options: "i",
      };
    const reviews = await CodeReview.find(filter)
      .select(summaryFields)
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    return res.json({ reviews });
  } catch (e) {
    return next(e);
  }
}
export async function reviewStats(req, res, next) {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const [summary] = await CodeReview.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          potentialIssues: {
            $sum: { $add: [{ $size: "$bugs" }, { $size: "$securityIssues" }] },
          },
          averageScore: { $avg: "$qualityScore" },
        },
      },
    ]);
    const byLanguage = await CodeReview.aggregate([
      { $match: { userId } },
      { $group: { _id: "$language", count: { $sum: 1 } } },
    ]);
    const recentReviews = await CodeReview.find({ userId })
      .select(summaryFields)
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
    return res.json({
      stats: {
        totalReviews: summary?.totalReviews || 0,
        potentialIssues: summary?.potentialIssues || 0,
        averageScore: Math.round(summary?.averageScore || 0),
        byLanguage,
      },
      recentReviews,
    });
  } catch (e) {
    return next(e);
  }
}
export async function getReview(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(404).json({ message: "Review not found." });
    const review = await CodeReview.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!review) return res.status(404).json({ message: "Review not found." });
    return res.json({ review });
  } catch (e) {
    return next(e);
  }
}
export async function deleteReview(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(404).json({ message: "Review not found." });
    const review = await CodeReview.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!review) return res.status(404).json({ message: "Review not found." });
    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}
