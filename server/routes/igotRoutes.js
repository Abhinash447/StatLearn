import express from 'express';
import { IGOTCourse } from '../models/IGOTCourse.js';
import { SEED_IGOT_COURSES } from '../data/seedData.js';

const router = express.Router();

// GET /api/igot/courses
router.get('/courses', async (req, res) => {
  try {
    let courses = await IGOTCourse.find();
    if (!courses || courses.length === 0) {
      courses = await IGOTCourse.insertMany(SEED_IGOT_COURSES);
    }
    res.json({
      status: 'connected',
      provider: 'iGOT Karmayogi Ecosystem',
      courses
    });
  } catch (err) {
    res.json({
      status: 'connected (fallback)',
      courses: SEED_IGOT_COURSES
    });
  }
});

// POST /api/igot/enroll/:id
router.post('/enroll/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const course = await IGOTCourse.findOneAndUpdate(
      { id },
      { $set: { isEnrolled: true, progress: 10 } },
      { new: true }
    );
    res.json({
      success: true,
      message: `Enrolled successfully in ${course?.title || id} on iGOT Karmayogi`,
      course
    });
  } catch (err) {
    res.json({ success: true, message: 'Enrolled in demo session' });
  }
});

export default router;
