import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import ApiService from './services/api'

export function getRouter() {
  const router = createTanStackRouter({
    basepath: import.meta.env.VITE_BASEPATH ?? '/',
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    context: {
      api: new ApiService('http://localhost:3001'),
    },
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
