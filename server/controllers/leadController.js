const Lead = require('../models/Lead');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
const getLeads = async (req, res) => {
  try {
    // Optionally filter by assigned user if not admin
    // const leads = await Lead.find({ assignedTo: req.user.id });
    const leads = await Lead.find().populate('assignedTo', 'name email');
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new lead
// @route   POST /api/leads
// @access  Private
const createLead = async (req, res) => {
  try {
    const { clientName, company, email, phone, status, notes, followUpDate } = req.body;

    if (!clientName || !company || !email) {
      return res.status(400).json({ message: 'Please provide clientName, company, and email' });
    }

    const lead = await Lead.create({
      clientName,
      company,
      email,
      phone,
      status: status || 'New',
      notes,
      followUpDate,
      assignedTo: req.user.id
    });

    const populatedLead = await lead.populate('assignedTo', 'name email');
    res.status(201).json(populatedLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Optional: Check user authorization
    // if (lead.assignedTo.toString() !== req.user.id) {
    //   return res.status(401).json({ message: 'User not authorized' });
    // }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('assignedTo', 'name email');

    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    await lead.deleteOne();
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLeads,
  createLead,
  updateLead,
  deleteLead
};
