require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;

// import router
const todoRouter = require("./routes/todoList");

// parse application/x.www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse aplicaation/json
app.use(bodyParser.json());
app.get("/", (request, response) => {
  response.send(`<h1>Welcome to endpoint root </h1>
    todoList : ./todo
  `);
});
app.use("/todo", todoRouter);

app.listen(port, () => {
  console.log("Your server is running on Port" + port);
});
