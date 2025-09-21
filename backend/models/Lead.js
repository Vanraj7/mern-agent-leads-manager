const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: String, required: true, unique: true }, // 🔹 unique index
  notes: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);
