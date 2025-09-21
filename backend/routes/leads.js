const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Lead = require('../models/Lead');

// Get all leads (with agent info)
router.get('/', auth, async (req, res) => {
  try {
    const leads = await Lead.find().populate('assignedTo', 'name email');
    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get leads for a specific agent
router.get('/agent/:id', auth, async (req, res) => {
  try {
    const leads = await Lead.find({ assignedTo: req.params.id });
    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
