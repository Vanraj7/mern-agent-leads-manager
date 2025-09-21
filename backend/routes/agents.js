const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const Agent = require('../models/Agent');

// Create agent (protected)
router.post('/', auth, async (req, res) => {
  const { name, email, mobile, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password required' });

  try {
    if (await Agent.findOne({ email })) return res.status(400).json({ message: 'Agent with this email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const agent = new Agent({ name, email, mobile, password: hashed });
    await agent.save();
    return res.json({ message: 'Agent created', agent: { id: agent._id, name: agent.name, email: agent.email, mobile: agent.mobile } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// List agents (protected)
router.get('/', auth, async (req, res) => {
  try {
    const agents = await Agent.find().select('-password');
    return res.json(agents);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
