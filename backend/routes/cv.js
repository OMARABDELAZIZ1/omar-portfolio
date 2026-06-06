const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const { db } = require('../config/db');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // We'll keep it simple and always call it cv.pdf or keep original extension
    // But for previewing easily in browser, PDF is best.
    cb(null, 'cv.pdf');
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// POST /api/cv/upload (Admin only)
router.post('/upload', auth, upload.single('cv'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload a PDF file' });
  }
  res.json({ success: true, message: 'CV uploaded successfully', file: req.file });
});

// GET /api/cv/preview
router.get('/preview', async (req, res) => {
  const filePath = path.join(__dirname, '../uploads/cv.pdf');
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'CV not found' });
  }

  try {
    await db.trackEvent('cv_view', { ip: req.ip });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="Omar_Abdelaziz_CV.pdf"');
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'Error processing request' });
  }
});

// GET /api/cv/download
router.get('/download', async (req, res) => {
  const filePath = path.join(__dirname, '../uploads/cv.pdf');
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'CV not found' });
  }

  try {
    await db.trackEvent('cv_download', { ip: req.ip });
    res.download(filePath, 'Omar_Abdelaziz_CV.pdf');
  } catch (err) {
    res.status(500).json({ error: 'Error processing request' });
  }
});

module.exports = router;
