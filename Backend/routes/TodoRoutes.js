const express = require("express");
const router = express.Router();
const {
  GetTodo,
  SingleTodo,
  CreateTodo,
  UpdateTodo,
  DeleteTodo,
} = require("../controllers/TodoController");

router.route("/todo").get(GetTodo).post(CreateTodo);
router.route("/todo/:id").get(SingleTodo).put(UpdateTodo).delete(DeleteTodo);

module.exports = router;
