import React from 'react'
import './SevenSegmentDisplay.css'

const digitToSegments: Partial<Record<string, string[]>> = {
  '0': ['a', 'b', 'c', 'd', 'e', 'f'],
  '1': ['b', 'c'],
  '2': ['a', 'b', 'g', 'e', 'd'],
  '3': ['a', 'b', 'g', 'c', 'd'],
  '4': ['f', 'g', 'b', 'c'],
  '5': ['a', 'f', 'g', 'c', 'd'],
  '6': ['a', 'f', 'g', 'c', 'd', 'e'],
  '7': ['a', 'b', 'c'],
  '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  '9': ['a', 'b', 'c', 'd', 'f', 'g'],
}

interface SevenSegmentDisplayProps {
  value: string
  color?: string
  background?: string
}

export default function SevenSegmentDisplay({
  value,
  color = '#ff0000',
  background = '#000000',
}: SevenSegmentDisplayProps) {
  const chars = value.split('')

  return (
    <div className="seven-seg-display" style={{ color, backgroundColor: background }}>
      {chars.map((ch, index) => {
        if (ch === ':') {
          return (
            <div key={index} className="ssd-colon">
              <div className="dot" />
              <div className="dot" />
            </div>
          )
        }

        const onSegments = digitToSegments[ch] ?? []
        return (
          <div key={index} className="ssd-digit">
            {['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((seg) => (
              <div
                key={seg}
                data-testid={`d${index}-${seg}`}
                className={`ssd-segment ${seg} ${onSegments.includes(seg) ? 'on' : 'off'}`}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}

