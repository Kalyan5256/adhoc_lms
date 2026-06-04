const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const courseController = require('../controllers/courseController');
const moduleController = require('../controllers/moduleController');
const lessonController = require('../controllers/lessonController');
const adminStatsController = require('../controllers/adminStatsController');
const analyticsController = require('../controllers/analyticsController');
const deviceController = require('../controllers/deviceController');

// All admin routes require authentication and admin role
router.use(protect);
router.use(adminOnly);

// admin stats
router.get('/stats', adminStatsController.getStats);

// Device management routes
router.get('/devices', deviceController.getAllDevices);
router.get('/users/:userId/devices', deviceController.getUserDevices);
router.delete('/devices/:id', deviceController.removeDevice);

// Course routes
router.post('/courses', courseController.createCourse);
router.put('/courses/:id', courseController.updateCourse);
router.delete('/courses/:id', courseController.deleteCourse);
router.get('/analytics', analyticsController.getAnalytics);

// Module routes
router.post('/courses/:courseId/modules', moduleController.addModule);
router.put('/modules/:id', moduleController.updateModule);
router.delete('/modules/:id', moduleController.deleteModule);

// Lesson routes
router.post('/modules/:moduleId/lessons', lessonController.addLesson);
router.put('/lessons/:id', lessonController.updateLesson);
router.delete('/lessons/:id', lessonController.deleteLesson);

// Database synchronization route
router.post('/sync-db', async (req, res) => {
  try {
    const { sequelize } = require('../models/associations');
    await sequelize.sync({ alter: true });
    res.json({
      success: true,
      message: 'Database synchronized successfully with alter: true'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database synchronization failed',
      error: error.message
    });
  }
});

module.exports = router;