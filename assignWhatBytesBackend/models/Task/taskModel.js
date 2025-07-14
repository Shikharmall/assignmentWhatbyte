const mongoose = require("mongoose");

// title, description, due date, and priority (low, medium, high).

const PRIORITIES = ["low", "medium", "high"];

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: PRIORITIES,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
