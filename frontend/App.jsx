import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  async function loadTasks() {
    const response = await axios.get('http://localhost:3001/tasks')
    setTasks(response.data)
  }

  async function addTask() {
    if (!title) return

    await axios.post('http://localhost:3001/tasks', {
      title
    })

    setTitle('')
    loadTasks()
  }

  async function deleteTask(id) {
    await axios.delete(`http://localhost:3001/tasks/${id}`)
    loadTasks()
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div className="container">
      <h1>TaskFlow</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Digite uma tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={addTask}>Adicionar</button>
      </div>

      {tasks.map(task => (
        <div className="task" key={task.id}>
          <span>{task.title}</span>
          <button onClick={() => deleteTask(task.id)}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  )
}

export default App
