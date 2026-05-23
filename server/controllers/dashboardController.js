const Lead = require('../models/Lead');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    // Optionally filter by assigned user if not admin
    // const filter = { assignedTo: req.user.id };
    const filter = {}; 

    const totalLeads = await Lead.countDocuments(filter);
    const wonDeals = await Lead.countDocuments({ ...filter, status: 'Won' });
    const lostDeals = await Lead.countDocuments({ ...filter, status: 'Lost' });
    
    // For pending follow-ups we can just count leads that are New or Contacted
    // or those with followUpDate in the future.
    const pendingFollowUps = await Lead.countDocuments({ 
      ...filter, 
      status: { $in: ['New', 'Contacted'] } 
    });

    res.json({
      totalLeads,
      wonDeals,
      lostDeals,
      pendingFollowUps
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats
};
