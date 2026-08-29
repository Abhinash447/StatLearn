import mongoose from 'mongoose';

const quizQuestionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswerIndex: { type: Number, required: true },
  explanation: { type: String, required: true },
  competency: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  category: { type: String, enum: ['statistical', 'technical', 'governance', 'behavioral'], default: 'statistical' }
});

const quizSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  topic: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard', 'Mixed'], default: 'Mixed' },
  questions: [quizQuestionSchema],
  sourceMaterialName: { type: String },
  sourceTextSnippet: { type: String }
}, { timestamps: true });

export const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
