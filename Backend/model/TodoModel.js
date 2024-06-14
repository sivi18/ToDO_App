const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    todos: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const TodosModule = mongoose.model("Todo", TodoSchema);

module.exports = TodosModule;
