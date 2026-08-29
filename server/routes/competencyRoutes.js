import express from 'express';
import { Competency } from '../models/Competency.js';
import { SEED_COMPETENCIES } from '../data/seedData.js';

const router = express.Router();

// GET /api/competencies
router.get('/', async (req, res) => {
  try {
    let list = await Competency.find();
    if (!list || list.length === 0) {
      list = await Competency.insertMany(SEED_COMPETENCIES);
    }
    res.json(list);
  } catch (err) {
    res.json(SEED_COMPETENCIES);
  }
});

// POST /api/competencies/calculate-gaps
router.post('/calculate-gaps', async (req, res) => {
  try {
    const list = req.body.competencies || (await Competency.find()) || SEED_COMPETENCIES;
    const gaps = list.map((c) => {
      const gap = Math.max(0, c.requiredScore - c.currentScore);
      const priority = gap >= 41 ? 'Critical' : gap >= 26 ? 'High' : gap >= 11 ? 'Medium' : 'Low';
      let aiExplanation = '';

      if (c.name.includes('AI') || c.name.includes('Machine Learning')) {
        aiExplanation = `Your ${c.name} score is ${c.currentScore}% vs ${c.requiredScore}% required. Critical ${gap}% gap for automated survey processing.`;
      } else if (c.name.includes('Cloud')) {
        aiExplanation = `Cloud Computing gap is ${gap}% (${c.currentScore}% current). Required for MeghRaj GI Cloud APIs.`;
      } else {
        aiExplanation = `${c.name} has a ${gap}% gap. Closing this enhances official analytical capacity.`;
      }

      return {
        competencyId: c.id,
        name: c.name,
        category: c.category,
        current: c.currentScore,
        required: c.requiredScore,
        gap,
        priority,
        aiExplanation
      };
    }).sort((a, b) => b.gap - a.gap);

    res.json(gaps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/competencies/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { currentScore, scoreDelta } = req.body;

  try {
    let comp = await Competency.findOne({ id });
    if (!comp) {
      comp = SEED_COMPETENCIES.find((c) => c.id === id);
    }

    const newScore = currentScore !== undefined ? currentScore : Math.min(100, Math.max(0, (comp.currentScore || 50) + (scoreDelta || 5)));
    const gap = Math.max(0, comp.requiredScore - newScore);
    const progress = Math.min(100, Math.round((newScore / comp.requiredScore) * 100));

    const updated = await Competency.findOneAndUpdate(
      { id },
      { $set: { currentScore: newScore, gap, progress } },
      { new: true }
    );

    res.json({ success: true, competency: updated || { ...comp, currentScore: newScore, gap, progress } });
  } catch (err) {
    res.json({ success: true, message: 'Updated in-memory' });
  }
});

export default router;
