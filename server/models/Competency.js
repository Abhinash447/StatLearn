import mongoose from 'mongoose';

const competencySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['statistical', 'technical', 'governance', 'behavioral'], 
    required: true 
  },
  currentScore: { type: Number, default: 0 },
  requiredScore: { type: Number, default: 75 },
  gap: { type: Number, default: 75 },
  level: { 
    type: String, 
    enum: ['Unassessed', 'Beginner', 'Intermediate', 'Advanced', 'Expert'], 
    default: 'Unassessed' 
  },
  progress: { type: Number, default: 0 },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High', 'Critical'], 
    default: 'Critical' 
  },
  description: { type: String, default: '' },
  lastAssessed: { type: String },
  historicalScores: [{
    date: { type: String },
    score: { type: Number }
  }]
}, { timestamps: true });

export const Competency = mongoose.models.Competency || mongoose.model('Competency', competencySchema);
