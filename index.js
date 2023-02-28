const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const Todo = require("./todoSchema");

const PORT = 3000;

mongoose.connect(
  "mongodb://user:passwowrd@localhost:27017/?authMechanism=DEFAULT",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// Listar todos los todos
app.get("/api/todos", async (req, res) => {
  // Hacer una consulta a la base de datos
  // Listar todos los todos
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error getting todos" });
  }
});

// Crear un todo
app.post("/api/todos", async (req, res) => {
  const todo = req.body;

  // Registrar todo en base de datos
  try {
    const newTodo = new Todo({
      title: todo.title,
      description: todo.description,
    });
    await newTodo.save();
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo" });
  }
});

// Obtener un todo
app.get("/api/todos/:id", async (req, res) => {
  const id = req.params.id;

  // Consultar a la base de datos por el id
  try {
    const todo = await Todo.findById(id);

    if (todo === null || todo === undefined) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error getting todo" });
  }
});

// Actualizar un todo
app.put("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(id, body, { new: true });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
});

// Eliminar un todo
app.delete("/api/todos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
