require("dotenv").config();
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const port = process.env.PORT;

const todoList = [
  {
    id: 1,
    task: "learn Express",
    done: false
  },
  {
    id: 2,
    task: "learn Express-Generator",
    done: false
  }
];
// parse application/x.www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse aplicaation/json
app.use(bodyParser.json());

// get all todo list
app.get("/", (req, res) => {
  res.send(todoList);
});

app.get("/:id", (req, res) => {
  try {
    const filteredTodo = todoList.find(item => item.id == req.params.id);
    res.send({
      message: "Here is what you looking for",
      filteredTodo
    });
  } catch (error) {
    res.send(error);
  }
});

// add new todo
app.post("/", (req, res) => {
  try {
    let newID = todoList.length + 1;
    let newTodo = {
      id: newID,
      task: req.body.task,
      done: false
    };
    todoList.push(newTodo);

    res.status(200).send({
      message: "todo successfully added",
      todoList
    });
  } catch (error) {
    res.send(error);
  }
});

// delete todo by its id
app.delete("/:id", (req, res) => {
  try {
    const idToDelete = req.params.id;
    let newTodo = todoList.filter(item => item.id !== parseInt(idToDelete));

    todoList = newTodo;

    res.status(200).send(todoList);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//update a todo by its id
app.put("/:id", (req, res) => {
  try {
    let getTodoToUpdate = todoList.findIndex(data => data.id == req.params.id);

    todoList.map(data => {
      if (data.id == req.params.id) {
        todoList[getTodoToUpdate].task = req.body.task;
      }
    });
    res.send({
      message: "data succsesfully updated",
      todoList
    });
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log("Your server is running on Port" + port);
});
