const router = require('express').Router();
const { db } = require('../config/db');
const auth = require('../middleware/auth');

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const projects = await db.getProjects(category);
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// POST /api/projects (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const { title, category, description, tech_stack, live_url, github_url, featured } = req.body;
    if (!title || !category)
      return res.status(400).json({ error: 'Title and category are required' });

    const project = await db.createProject({ title, category, description, tech_stack, live_url, github_url, featured: featured ? 1 : 0 });
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT /api/projects/:id (auth required)
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, category, description, tech_stack, live_url, github_url, featured } = req.body;
    const project = await db.updateProject(req.params.id, { title, category, description, tech_stack, live_url, github_url, featured: featured ? 1 : 0 });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id (auth required)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await db.deleteProject(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Project not found' });
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
