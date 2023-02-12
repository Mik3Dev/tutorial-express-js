const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = 3000;
let todos = [
  {
    id: 1,
    title: "Todo One",
    completed: false,
    description: "This is the first todo",
  },
  {
    id: 2,
    title: "Todo Two",
    completed: false,
    description: "This is the second todo",
  },
  {
    id: 3,
    title: "Todo Tree",
    completed: false,
    description: "This is the third todo",
  },
  {
    id: 4,
    title: "Todo four",
    completed: false,
    description: "This is the fourth todo",
  },
];

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.get("/api/todos", (req, res) => {
  // Hacer una consulta a la base de datos
  // Listar todos los todos
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const todo = req.body;

  // Registrar todo en base de datos
  todo.id = todos.length + 1;
  todo.completed = false;
  todos.push(todo);

  res.json(todo);
});

app.get("/api/todos/:id", (req, res) => {
  const id = req.params.id;

  // Consultar a la base de datos por el id
  const todo = todos.find((element) => {
    return element.id == id;
  });

  if (todo === undefined) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }

  res.json(todo);
});

app.put("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const todo = todos.find((element) => {
    return element.id == id;
  });

  if (todo === undefined) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }

  todo.title = body.title;
  todo.description = body.description;
  todo.completed = body.completed;

  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((element) => {
    return element.id == id;
  });

  if (!todo) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }

  todos = todos.filter((element) => {
    return element.id != id;
  });

  res.json({ message: "Todo deleted" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
