import express from 'express';
import { Department } from '../models/Department.js';
import { SEED_DEPARTMENTS } from '../data/seedData.js';

const router = express.Router();

// GET /api/admin/analytics
router.get('/analytics', async (req, res) => {
  try {
    let departments = await Department.find();
    if (!departments || departments.length === 0) {
      departments = await Department.insertMany(SEED_DEPARTMENTS);
    }

    res.json({
      kpis: {
        totalOfficials: 2486,
        avgCompetency: 68,
        criticalSkillGaps: 14,
        trainingCompletion: 74,
        aiReadiness: 42,
        learningHours: 18642
      },
      departments,
      emergingSkills: [
        { name: 'AI & Machine Learning', growthRate: 38, demandLevel: 'Very High', currentReadiness: 42, projectedDemand2027: 85 },
        { name: 'Data Science & Python', growthRate: 31, demandLevel: 'Very High', currentReadiness: 58, projectedDemand2027: 88 },
        { name: 'Cloud & Sovereign Infra', growthRate: 27, demandLevel: 'High', currentReadiness: 36, projectedDemand2027: 78 },
        { name: 'Data Engineering & Open APIs', growthRate: 24, demandLevel: 'High', currentReadiness: 49, projectedDemand2027: 74 }
      ]
    });
  } catch (err) {
    res.json({
      kpis: { totalOfficials: 2486, avgCompetency: 68, criticalSkillGaps: 14, trainingCompletion: 74, aiReadiness: 42, learningHours: 18642 },
      departments: SEED_DEPARTMENTS
    });
  }
});

export default router;
