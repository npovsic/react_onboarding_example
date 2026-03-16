import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_logged-out/register/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_logged-out/register"!</div>
}
