import mongoose from 'mongoose';

const nsstaProgrammeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  mode: { type: String, enum: ['In-person', 'Hybrid', 'Online Live'], default: 'In-person' },
  eligibility: { type: String },
  competencies: [{ type: String }],
  competencyCategory: { type: String, enum: ['statistical', 'technical', 'governance', 'behavioral'] },
  recommendationReason: { type: String },
  startDate: { type: String },
  venue: { type: String, default: 'NSSTA Campus, Greater Noida' },
  seatsAvailable: { type: Number, default: 35 },
  targetRoles: [{ type: String }],
  isNominated: { type: Boolean, default: false },
  matchScore: { type: Number, default: 90 },
  faculty: { type: String }
}, { timestamps: true });

export const NSSTAProgramme = mongoose.models.NSSTAProgramme || mongoose.model('NSSTAProgramme', nsstaProgrammeSchema);
