import React from 'react'
import { Task } from '../types.d'

interface Props { task: Task; onToggle: (id: string) => void; onDelete: (id: string) => void }

export default function TaskItem({ task, onToggle, onDelete }: Props){
  return (
    <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
        <div className={`${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</div>
      </div>
      <button className="text-red-500" onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  )
}
