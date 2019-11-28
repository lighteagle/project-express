const express = require("express");
const route = express.Router();

const {
  getTodos,
  getTodoById,
  postTodo,
  putTodo,
  deleteTodoById
} = require("../controllers/todoList");

// get all todo list
route.get("/", getTodos);

route.get("/:id", getTodoById);

// add new todo
route.post("/", postTodo);

//update a todo by its id
route.put("/:id", putTodo);

// delete todo by its id
route.delete("/:id", deleteTodoById);

module.exports = route;
