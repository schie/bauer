import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import SevenSegmentDisplay from '../components/SevenSegmentDisplay'

export const Route = createFileRoute('/count-down')({
  component: RouteComponent,
  // Define query param for end date-time
  validateSearch: (search) => {
    // Accept ISO string or timestamp
    const end = search.end
    const now = Date.now()
    const maxEnd = now + 24 * 60 * 60 * 1000
    let endDate: Date

    if (!end) {
      endDate = new Date(now + 60 * 60 * 1000)
    } else {
      endDate = new Date(
        typeof end === 'string' ||
        typeof end === 'number' ||
        end instanceof Date
          ? end
          : '',
      )
      if (isNaN(endDate.getTime())) {
        endDate = new Date(now + 60 * 60 * 1000)
      }
    }

    // Clamp to max 24 hours from now
    if (endDate.getTime() > maxEnd) {
      endDate = new Date(maxEnd)
    }

    return { end: endDate.toISOString() }
  },
})

function getTimeString(end: Date) {
  const now = new Date()
  const diff = end.getTime() - now.getTime()
  if (diff <= 0) return '00:00:00'
  const hours = Math.floor(diff / 1000 / 60 / 60)
  const minutes = Math.floor((diff / 1000 / 60) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

function RouteComponent() {
  const { end } = Route.useSearch()
  const endDate = new Date(end as string)
  const [timeString, setTimeString] = useState(() => getTimeString(endDate))

  useEffect(() => {
    if (timeString === '00:00:00') return
    const id = setInterval(() => {
      const ts = getTimeString(endDate)
      setTimeString(ts)
      document.title = ts
    }, 1000)
    return () => clearInterval(id)
  }, [endDate, timeString])

  return (
    <div className="flex flex-col justify-center items-center p-4 min-h-screen">
      <SevenSegmentDisplay value={timeString} />
    </div>
  )
}
