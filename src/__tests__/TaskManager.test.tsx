import { render, screen } from '@testing-library/react'
import TaskManager from '../pages/TaskManager'
import { describe, it, expect } from 'vitest'

describe('TaskManager', () => {
  it('shows heading', () => {
    render(<TaskManager />)
    expect(screen.getByText(/Task Manager/i)).toBeDefined()
  })
})
