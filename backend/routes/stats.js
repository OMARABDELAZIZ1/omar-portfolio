const router = require('express').Router();
const { db } = require('../config/db');
const auth = require('../middleware/auth');

// GET /api/stats (auth required)
router.get('/', auth, async (req, res) => {
  try {
    const stats = await db.getStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// POST /api/stats/track (public — for tracking page views etc.)
router.post('/track', async (req, res) => {
  try {
    const { event, metadata } = req.body;
    const allowed = ['page_view', 'project_view', 'cv_download', 'cv_view'];
    if (!allowed.includes(event))
      return res.status(400).json({ error: 'Invalid event type' });

    await db.trackEvent(event, metadata);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to track event' });
  }
});

module.exports = router;
