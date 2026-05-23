const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Please add a client name'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Please add a company name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters']
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Negotiation', 'Won', 'Lost'],
    default: 'New'
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  followUpDate: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);
