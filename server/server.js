import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Routes
import authRoutes from './routes/authRoutes.js';
import competencyRoutes from './routes/competencyRoutes.js';
import igotRoutes from './routes/igotRoutes.js';
import nsstaRoutes from './routes/nsstaRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import assistantRoutes from './routes/assistantRoutes.js';

// Seed Data
import { User } from './models/User.js';
import { Competency } from './models/Competency.js';
import { IGOTCourse } from './models/IGOTCourse.js';
import { NSSTAProgramme } from './models/NSSTAProgramme.js';
import { Department } from './models/Department.js';
import { 
  SEED_USERS, 
  SEED_COMPETENCIES, 
  SEED_IGOT_COURSES, 
  SEED_NSSTA_PROGRAMMES, 
  SEED_DEPARTMENTS 
} from './data/seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/statskill_ai';

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'StatSkill AI — MERN Backend Gateway',
    moSPIDepartment: 'Data Informatics & Innovation Division (DIID)',
    problemStatement: '26101'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/competencies', competencyRoutes);
app.use('/api/igot', igotRoutes);
app.use('/api/nssta', nsstaRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/assistant', assistantRoutes);

// Auto-seed function
async function seedDatabaseIfEmpty() {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany(SEED_USERS);
      console.log('✅ Seeded initial MoSPI users (Priya Sharma, Dr. Alok Verma)');
    }

    const compCount = await Competency.countDocuments();
    if (compCount === 0) {
      await Competency.insertMany(SEED_COMPETENCIES);
      console.log(`✅ Seeded ${SEED_COMPETENCIES.length} MoSPI Competency Profiles`);
    }

    const igotCount = await IGOTCourse.countDocuments();
    if (igotCount === 0) {
      await IGOTCourse.insertMany(SEED_IGOT_COURSES);
      console.log('✅ Seeded iGOT Karmayogi Course Catalogue');
    }

    const nsstaCount = await NSSTAProgramme.countDocuments();
    if (nsstaCount === 0) {
      await NSSTAProgramme.insertMany(SEED_NSSTA_PROGRAMMES);
      console.log('✅ Seeded NSSTA TPAC Training Calendar');
    }

    const deptCount = await Department.countDocuments();
    if (deptCount === 0) {
      await Department.insertMany(SEED_DEPARTMENTS);
      console.log('✅ Seeded 6 MoSPI Department Workforce Statistics');
    }
  } catch (err) {
    console.warn('⚠️ Seeding skipped or handled via memory fallback:', err.message);
  }
}

// Connect to MongoDB with graceful fallback
mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 2000
  })
  .then(async () => {
    console.log('🟢 Connected to MongoDB at:', MONGODB_URI);
    await seedDatabaseIfEmpty();
  })
  .catch((err) => {
    console.warn('🟡 MongoDB daemon not detected locally. Operating in High-Fidelity Dual Fallback Mode.');
  });

// Start Express Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 StatSkill AI — Express.js Server running on port ${PORT}`);
  console.log(`🏛️  MoSPI Data Informatics & Innovation Division (DIID)`);
  console.log(`📡 Endpoints active at: http://localhost:${PORT}/api/`);
  console.log(`====================================================`);
});
