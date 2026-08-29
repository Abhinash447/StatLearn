import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: 'demo123' },
  role: { type: String, enum: ['learner', 'admin'], default: 'learner' },
  designation: { type: String, default: 'Statistical Officer' },
  department: { type: String, default: 'National Sample Survey (NSS)' },
  currentAssignment: { type: String, default: 'Survey Data Analytics & Quality Assurance' },
  education: { type: String, default: 'M.Sc. Statistics' },
  experienceYears: { type: Number, default: 6 },
  previousTraining: [{ type: String }],
  employeeId: { type: String, default: 'MoSPI-NSS-2020-0492' },
  location: { type: String, default: 'Sankhyiki Bhawan, New Delhi' },
  joinedDate: { type: String, default: '2020-03-15' }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
