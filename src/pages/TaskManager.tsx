import React, { useMemo, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import TaskItem from '../components/TaskItem'
import Card from '../components/Card'
import Button from '../components/Button'
import { Task } from '../types.d'

export default function TaskManager(){
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState<'all'|'active'|'completed'>('all')

  function addTask(e?: React.FormEvent){
    e?.preventDefault()
    if (!title.trim()) return
    const newTask: Task = { id: Date.now().toString(), title: title.trim(), completed: false }
    setTasks([newTask, ...tasks])
    setTitle('')
  }

  function toggleTask(id: string){ setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)) }
  function deleteTask(id: string){ setTasks(tasks.filter(t => t.id !== id)) }

  const filtered = useMemo(() => {
    if (filter === 'active') return tasks.filter(t => !t.completed)
    if (filter === 'completed') return tasks.filter(t => t.completed)
    return tasks
  }, [tasks, filter])

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-3">Task Manager</h2>
      <form className="flex gap-2 mb-4" onSubmit={addTask}>
        <input className="flex-1 rounded border px-3 py-2 dark:bg-gray-700" value={title} onChange={e => setTitle(e.target.value)} placeholder="New task" />
        <Button type="submit">Add</Button>
      </form>

      <div className="flex gap-2 mb-4">
        <Button variant={filter === 'all' ? 'primary' : 'secondary'} onClick={() => setFilter('all')}>All</Button>
        <Button variant={filter === 'active' ? 'primary' : 'secondary'} onClick={() => setFilter('active')}>Active</Button>
        <Button variant={filter === 'completed' ? 'primary' : 'secondary'} onClick={() => setFilter('completed')}>Completed</Button>
      </div>

      <div className="space-y-1">
        {filtered.length === 0 ? (
          <div className="p-4 text-sm text-gray-500">No tasks</div>
        ) : (
          filtered.map(task => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
          ))
        )}
      </div>
    </Card>
  )
}
