import mongoose from 'mongoose';

const igotCourseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  provider: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Intermediate' },
  competencies: [{ type: String }],
  competencyCategory: { type: String, enum: ['statistical', 'technical', 'governance', 'behavioral'] },
  matchScore: { type: Number, default: 85 },
  department: { type: String, default: 'All' },
  rating: { type: Number, default: 4.8 },
  enrolledCount: { type: Number, default: 100 },
  description: { type: String },
  modules: [{ type: String }],
  isEnrolled: { type: Boolean, default: false },
  progress: { type: Number, default: 0 },
  certificateOffered: { type: Boolean, default: true },
  estimatedHours: { type: Number, default: 10 },
  url: { type: String }
}, { timestamps: true });

export const IGOTCourse = mongoose.models.IGOTCourse || mongoose.model('IGOTCourse', igotCourseSchema);
