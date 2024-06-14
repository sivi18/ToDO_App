const asynchandler = require("express-async-handler");
const TodosModule = require("../model/TodoModel");
const GetTodo = asynchandler(async (req, res) => {
  try {
    const response = await TodosModule.find();
    res.status(200).json({ response });
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
});
const SingleTodo = asynchandler(async (req, res) => {
  const PostId = req.params.id;
  try {
    const response = await TodosModule.findById({ _id: PostId });
    res.status(200).json({ response });
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
  res.json({ message: "Todo Fetched" });
});

const CreateTodo = asynchandler(async (req, res) => {
  const { Todos, Completed, Description } = req.body;

  if (!Todos || !Description) {
    return res.status(400).json({ message: "All Fields are Mandatory" });
  }

  try {
    const response = await TodosModule.create({
      todos: Todos,
      description: Description,
      completed: Completed || false, // Default to false if not provided
    });

    if (response) {
      return res.status(201).json({
        response,
      });
    } else {
      return res.status(400).json({ message: "Failed to create todo" });
    }
  } catch (error) {
    console.error("Error creating todo:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});
const UpdateTodo = asynchandler(async (req, res) => {
  const { Todos, Completed, Description } = req.body;

  if (!Todos || !Description) {
    return res.status(400).json({ message: "All Fields are Mandatory" });
  }
  const PostId = req.params.id;
  console.log(PostId);
  try {
    const CheckTodo = await TodosModule.findById(PostId);

    if (!CheckTodo) {
      return res.status(404).json({ message: "Todo Not Found" });
    }

    CheckTodo.todos = Todos;
    CheckTodo.description = Description;
    CheckTodo.completed = Completed;

    const updatedTodo = await CheckTodo.save();

    res.status(200).json({ updatedTodo });
  } catch (error) {
    console.error("Error updating todo:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});
const DeleteTodo = asynchandler(async (req, res) => {
  const PostId = req.params.id;
  if (!PostId) {
    return res.status(401).json({ message: "Id Not Exist!" });
  }
  try {
    const response = await TodosModule.findByIdAndDelete({ _id: PostId });
    if (!response) {
      return res
        .status(400)
        .json({ message: "Id Not Found Deletion Incomplete" });
    }
    res.status(200).json({ message: "Todo Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = { GetTodo, SingleTodo, CreateTodo, UpdateTodo, DeleteTodo };
