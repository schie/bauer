import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import SevenSegmentDisplay from '../components/SevenSegmentDisplay'

export const Route = createFileRoute('/clock')({
  component: RouteComponent,
})

function RouteComponent() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const timeString = now.toLocaleTimeString(undefined, {
    hour12: false,
  })

  return (
    <div className="flex justify-center p-4">
      <SevenSegmentDisplay value={timeString} />
    </div>
  )
}
