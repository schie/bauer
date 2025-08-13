/* @vitest-environment jsdom */
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SevenSegmentDisplay from './SevenSegmentDisplay'

describe('SevenSegmentDisplay', () => {
  it('renders the correct segments for digit "8"', () => {
    const { getByTestId } = render(<SevenSegmentDisplay value="8" />)
    // All segments should be visible (no opacity-20)
    ;['a', 'b', 'c', 'd', 'e', 'f', 'g'].forEach((seg) => {
      const el = getByTestId(`d0-${seg}`)
      expect(el.className).not.toContain('opacity-20')
    })
  })

  it('renders the correct segments for digit "1"', () => {
    const { getByTestId } = render(<SevenSegmentDisplay value="1" />)
    // Only segments b and c should be visible
    ;['a', 'd', 'e', 'f', 'g'].forEach((seg) => {
      const el = getByTestId(`d0-${seg}`)
      expect(el.className).toContain('opacity-20')
    })
    ;['b', 'c'].forEach((seg) => {
      const el = getByTestId(`d0-${seg}`)
      expect(el.className).not.toContain('opacity-20')
    })
  })

  it('renders multiple digits', () => {
    const { getByTestId } = render(<SevenSegmentDisplay value="12" />)
    // First digit: "1"
    expect(getByTestId('d0-b').className).not.toContain('opacity-20')
    expect(getByTestId('d0-c').className).not.toContain('opacity-20')
    // Second digit: "2"
    expect(getByTestId('d1-a').className).not.toContain('opacity-20')
    expect(getByTestId('d1-b').className).not.toContain('opacity-20')
    expect(getByTestId('d1-g').className).not.toContain('opacity-20')
    expect(getByTestId('d1-e').className).not.toContain('opacity-20')
    expect(getByTestId('d1-d').className).not.toContain('opacity-20')
  })

  it('renders colon ":" as two dots', () => {
    const { container } = render(<SevenSegmentDisplay value=":" />)
    const dots = container.querySelectorAll('span.bg-primary')
    expect(dots.length).toBe(2)
    expect(dots[0].classList.contains('rounded-full')).toBe(true)
    expect(dots[1].classList.contains('rounded-full')).toBe(true)
  })

  it('applies custom color and background', () => {
    const { container } = render(
      <SevenSegmentDisplay value="0" color="#00ff00" background="#222222" />,
    )
    const root = container.querySelector('.seven-seg-display') as HTMLDivElement
    expect(root.style.color).toBe('rgb(0, 255, 0)')
    expect(root.style.backgroundColor).toBe('rgb(34, 34, 34)')
  })

  it('renders nothing for unknown characters', () => {
    const { container } = render(<SevenSegmentDisplay value="X" />)
    // Should render a digit container, but all segments should be faded
    const fadedSegments = container.querySelectorAll('[data-testid^="d0-"]')
    fadedSegments.forEach((el) => {
      expect(el.className).toContain('opacity-20')
    })
  })
})
