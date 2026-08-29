import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  officialsCount: { type: Number, default: 0 },
  avgCompetency: { type: Number, default: 0 },
  criticalGaps: { type: Number, default: 0 },
  trainingCompletion: { type: Number, default: 0 },
  aiReadiness: { type: Number, default: 0 },
  topGaps: [{ type: String }]
}, { timestamps: true });

export const Department = mongoose.models.Department || mongoose.model('Department', departmentSchema);
