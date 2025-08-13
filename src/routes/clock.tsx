import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/clock')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/clock"!</div>
}
