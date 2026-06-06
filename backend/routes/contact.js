const router = require('express').Router();
const { db } = require('../config/db');
const auth = require('../middleware/auth');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ error: 'Name, email and message are required' });

    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(email))
      return res.status(400).json({ error: 'Invalid email address' });

    const contact = await db.createContact({ name, email, message });
    res.status(201).json({
      success: true,
      message: 'Message sent successfully! Omar will get back to you soon.',
      data: { id: contact.id }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// GET /api/contact (auth required)
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await db.getContacts();
    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

module.exports = router;
