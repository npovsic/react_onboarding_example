import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_logged-out')({
  component: RouteComponent,
})

// This is basically the layout for the logged out routes which are all the same.
function RouteComponent() {
  return (
    <main className="flex min-h-screen">
      <div className="w-[45vw] bg-blue-500 hidden md:block">
        
      </div>
      
      <div className="onboarding-shell min-w-0 grow py-16 px-8 xl:py-24 xl:px-32">
        <div className="min-h-full flex flex-col">
          <Outlet />
        </div>
      </div>
    </main>
    )
}
