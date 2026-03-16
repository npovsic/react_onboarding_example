import { Outlet, createRootRoute, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import '../styles.css'
import AuthenticationUtil from '#/utils/authentication'

export const Route = createRootRoute({
  // Always run before the root component is rendered.
  beforeLoad: async ({ location }) => {
    if (!AuthenticationUtil.isAuthenticated()) {
      if (location.pathname === '/login' || location.pathname === '/register') {
        return
      }
      
      throw redirect({
        to: '/login',
      })
    } else {
      if (location.pathname === '/login' || location.pathname === '/register') {
        throw redirect({
          to: '/',
        })
      }
    }
  },
  component: RootComponent,
})

/**
 * Renders the root component that will be rendered by the router and encapsulates 
 * the entire application.
 * 
 * @returns The root component.
 */
function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}
