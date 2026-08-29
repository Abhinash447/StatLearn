import mongoose from 'mongoose';

const quizAttemptSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  quizId: { type: String, required: true },
  quizTitle: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  percentage: { type: Number, required: true },
  date: { type: String, required: true },
  competencyBreakdown: { type: Object, default: {} },
  feedback: { type: String },
  recommendedNextStep: { type: String },
  userAnswers: [{ type: Number }],
  timeTakenSeconds: { type: Number, default: 0 }
}, { timestamps: true });

export const QuizAttempt = mongoose.models.QuizAttempt || mongoose.model('QuizAttempt', quizAttemptSchema);
