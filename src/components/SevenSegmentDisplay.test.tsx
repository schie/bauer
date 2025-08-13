/* @vitest-environment jsdom */
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SevenSegmentDisplay from './SevenSegmentDisplay'

describe('SevenSegmentDisplay', () => {
  it('lights all segments for 8', () => {
    const { getByTestId } = render(<SevenSegmentDisplay value="8" />)
    ;['a', 'b', 'c', 'd', 'e', 'f', 'g'].forEach((seg) => {
      const element = getByTestId(`d0-${seg}`)
      expect(element.className).toContain('on')
    })
  })

  it('lights only b and c for 1', () => {
    const { getByTestId } = render(<SevenSegmentDisplay value="1" />)
    ;['b', 'c'].forEach((seg) => {
      const element = getByTestId(`d0-${seg}`)
      expect(element.className).toContain('on')
    })
    ;['a', 'd', 'e', 'f', 'g'].forEach((seg) => {
      const element = getByTestId(`d0-${seg}`)
      expect(element.className).toContain('off')
    })
  })
})
