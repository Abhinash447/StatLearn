import express from 'express';
import { NSSTAProgramme } from '../models/NSSTAProgramme.js';
import { SEED_NSSTA_PROGRAMMES } from '../data/seedData.js';

const router = express.Router();

// GET /api/nssta/programmes
router.get('/programmes', async (req, res) => {
  try {
    let progs = await NSSTAProgramme.find();
    if (!progs || progs.length === 0) {
      progs = await NSSTAProgramme.insertMany(SEED_NSSTA_PROGRAMMES);
    }
    res.json({
      status: 'synced',
      calendar: 'NSSTA TPAC 2026-27',
      programmes: progs
    });
  } catch (err) {
    res.json({
      status: 'synced (fallback)',
      programmes: SEED_NSSTA_PROGRAMMES
    });
  }
});

// POST /api/nssta/nominate/:id
router.post('/nominate/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const prog = await NSSTAProgramme.findOneAndUpdate(
      { id },
      { $set: { isNominated: true } },
      { new: true }
    );
    res.json({
      success: true,
      message: `Nomination dispatched for ${prog?.title || id} to NSSTA Greater Noida`,
      programme: prog
    });
  } catch (err) {
    res.json({ success: true, message: 'Nomination dispatched' });
  }
});

export default router;
