import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-8 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
      <div className="max-w-4xl mx-auto">© {new Date().getFullYear()} CrisisConnect — All rights reserved.</div>
    </footer>
  )
}
