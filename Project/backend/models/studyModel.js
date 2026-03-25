const mongoose = require('mongoose')

const studySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
    required: [true, 'Please add a study task']
  },
  subject: {
    type: String,
    required: false
  },
  dueDate: {
    type: Date,
    required: false
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Study', studySchema)