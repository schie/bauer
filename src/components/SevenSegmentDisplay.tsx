import './SevenSegmentDisplay.css'

const digitToSegments: Partial<Record<string, Array<string>>> = {
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
    <div
      className="seven-seg-display"
      style={{ color, backgroundColor: background }}
    >
      {chars.map((ch, index) => {
        if (ch === ':') {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center px-2"
            >
              <span className="w-2 h-2 rounded-full bg-primary mb-2" />
              <span className="w-2 h-2 rounded-full bg-primary" />
            </div>
          )
        }

        const onSegments = digitToSegments[ch] ?? []
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-1 p-2 bg-base-200 rounded-lg"
          >
            <div className="flex justify-center gap-1">
              {/* Top segment */}
              <div
                data-testid={`d${index}-a`}
                className={`h-1 w-8 rounded bg-primary ${onSegments.includes('a') ? '' : 'opacity-20'}`}
              />
            </div>
            <div className="flex justify-between w-full">
              {/* Top left */}
              <div
                data-testid={`d${index}-f`}
                className={`h-8 w-1 rounded bg-primary ${onSegments.includes('f') ? '' : 'opacity-20'}`}
              />
              {/* Top right */}
              <div
                data-testid={`d${index}-b`}
                className={`h-8 w-1 rounded bg-primary ${onSegments.includes('b') ? '' : 'opacity-20'}`}
              />
            </div>
            <div className="flex justify-center gap-1">
              {/* Middle segment */}
              <div
                data-testid={`d${index}-g`}
                className={`h-1 w-8 rounded bg-primary ${onSegments.includes('g') ? '' : 'opacity-20'}`}
              />
            </div>
            <div className="flex justify-between w-full">
              {/* Bottom left */}
              <div
                data-testid={`d${index}-e`}
                className={`h-8 w-1 rounded bg-primary ${onSegments.includes('e') ? '' : 'opacity-20'}`}
              />
              {/* Bottom right */}
              <div
                data-testid={`d${index}-c`}
                className={`h-8 w-1 rounded bg-primary ${onSegments.includes('c') ? '' : 'opacity-20'}`}
              />
            </div>
            <div className="flex justify-center gap-1">
              {/* Bottom segment */}
              <div
                data-testid={`d${index}-d`}
                className={`h-1 w-8 rounded bg-primary ${onSegments.includes('d') ? '' : 'opacity-20'}`}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
