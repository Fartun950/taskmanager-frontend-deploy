import { render, screen } from '@testing-library/react'
import Button from '../components/Button'
import { describe, it, expect } from 'vitest'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click</Button>)
    expect(screen.getByText('Click')).toBeDefined()
  })
})
