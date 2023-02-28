const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

// Sample data
let todos = [
  { id: uuidv4(), text: 'Learn Node.js' },
  { id: uuidv4(), text: 'Build a todo list app' },
];

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Get a todo by id
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === req.params.id);
  if (!todo) return res.status(404).send('Todo not found');
  res.json(todo);
});

// Create a new todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).send('Text is required');
  const todo = { id: uuidv4(), text };
  todos.push(todo);
  res.status(201).json(todo);
});

// Update a todo by id
app.put('/api/todos/:id', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).send('Text is required');
  const todo = todos.find((t) => t.id === req.params.id);
  if (!todo) return res.status(404).send('Todo not found');
  todo.text = text;
  res.json(todo);
});

// Delete a todo by id
app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).send('Todo not found');
  todos.splice(index, 1);
  res.status(204).send();
});

app.delete('/api/todos', (req, res) => {
  todos = [];
  res.status(204).send();
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));