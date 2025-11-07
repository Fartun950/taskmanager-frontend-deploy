import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import Button from './Button'

export default function Navbar(){
  const themeCtx = useContext(ThemeContext)
  if (!themeCtx) return null
  const { theme, toggleTheme } = themeCtx

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-lg">CrisisConnect</Link>
          <Link to="/tasks" className="text-sm">Tasks</Link>
          <Link to="/posts" className="text-sm">Posts</Link>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={toggleTheme} variant="secondary">{theme === 'dark' ? 'Light' : 'Dark'}</Button>
        </div>
      </div>
    </nav>
  )
}
