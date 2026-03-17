import { Outlet, createRootRoute, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import '../styles.css'
import AuthenticationUtil from '#/utils/authentication'

export const Route = createRootRoute({
  // Always run before the root component is rendered.
  beforeLoad: async ({ matches }) => {  
    const isLoggedOutRoute = matches.find((match) => match.routeId.startsWith('/_logged-out'))
    
    if (!AuthenticationUtil.isAuthenticated()) {
      if (isLoggedOutRoute) {
        // If we are already on a logged out route, we can just return.
        
        return
      }
      
      throw redirect({
        to: '/login',
      })
    } else {
      if (isLoggedOutRoute) {
        // If we are on a logged out route and we are authenticated,
        // we need to redirect to the home page.
        
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
