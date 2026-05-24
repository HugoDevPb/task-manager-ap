const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

let tasks = []

app.get('/tasks', (req, res) => {
  res.json(tasks)
})

app.post('/tasks', (req, res) => {
  const task = {
    id: Date.now(),
    title: req.body.title
  }

  tasks.push(task)
  res.status(201).json(task)
})

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(task => task.id != req.params.id)
  res.sendStatus(204)
})

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001')
})
