import React from 'react'

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }){
  return (
    <div className={`rounded-lg shadow-sm p-4 bg-white dark:bg-gray-800 ${className}`}>{children}</div>
  )
}
