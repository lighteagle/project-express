let { todoList } = require("../models/todoList.js");

module.exports = {
  getTodos: (req, res) => {
    res.send(todoList);
  },

  getTodoById: (req, res) => {
    try {
      const filteredTodo = todoList.find(item => item.id == req.params.id);
      res.send({
        message: "Here is what you looking for",
        filteredTodo
      });
    } catch (error) {
      res.send(error);
    }
  },

  postTodo: (req, res) => {
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
        // newTodo,
        todoList
      });
    } catch (error) {
      res.send(error);
    }
  },

  putTodo: (req, res) => {
    try {
      let getTodoToUpdate = todoList.findIndex(
        data => data.id == req.params.id
      );

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
  },

  deleteTodoById: (req, res) => {
    console.log(true);

    try {
      const idToDelete = req.params.id;
      let newTodo = todoList.filter(item => item.id !== parseInt(idToDelete));

      todoList = newTodo;

      res.status(200).send(todoList);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
};
