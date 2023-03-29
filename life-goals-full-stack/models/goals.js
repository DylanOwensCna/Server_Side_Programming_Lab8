const mongoose = require("mongoose");

// Define the Goal schema
const GoalSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  is_completed: {
    type: Boolean,
    default: false
  }
});


GoalSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/goals/${this._id}`;
  });


module.exports = mongoose.model("Goal", GoalSchema);