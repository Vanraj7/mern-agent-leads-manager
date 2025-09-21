const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');
const auth = require('../middleware/auth');
const Agent = require('../models/Agent');
const Lead = require('../models/Lead');

// Multer setup (store file in memory)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ['.csv', '.xlsx', '.xls'];
    if (!allowed.some(ext => file.originalname.endsWith(ext))) {
      return cb(new Error('Only CSV, XLSX, XLS files allowed'));
    }
    cb(null, true);
  }
});

// Upload and distribute leads
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Read the file
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    if (!data.length) return res.status(400).json({ message: 'File is empty' });

    // Validate columns
    const requiredFields = ['FirstName', 'Phone', 'Notes'];
    const invalid = data.some(row => !requiredFields.every(f => row[f] !== undefined));
    if (invalid) return res.status(400).json({ message: 'Invalid file format' });

    // Fetch agents
    const agents = await Agent.find();
    if (!agents.length) return res.status(400).json({ message: 'No agents found' });

    let inserted = 0;
    let skipped = 0;
    const leads = [];

    for (let i = 0; i < data.length; i++) {
      const { FirstName, Phone, Notes } = data[i];

      // Check if lead already exists (by phone)
      const exists = await Lead.findOne({ phone: Phone });
      if (exists) {
        skipped++;
        continue; // Skip duplicate
      }

      const agent = agents[i % agents.length]; // Round-robin assignment
      leads.push({
        firstName: FirstName,
        phone: Phone,
        notes: Notes,
        assignedTo: agent._id
      });
      inserted++;
    }

    // Save leads in DB
    try {
      if (leads.length) {
        await Lead.insertMany(leads, { ordered: false }); 
        // ordered:false → keeps inserting even if one fails
      }
    } catch (err) {
      if (err.code === 11000) {
        console.warn("Duplicate key error:", err.keyValue);
      } else {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
    }

    return res.json({
      message: 'Leads uploaded and distributed',
      inserted,
      skipped
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
