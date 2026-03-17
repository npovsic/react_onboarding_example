import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import ApiService from './services/api'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultViewTransition: {
    types: ({fromLocation}) => {
      if (!fromLocation) {
        // This is the first render, so we don't want to transition.
        
        return false;
      }
      
      return ['fade'];
    },
  },
  context: {
    api: new ApiService('http://localhost:3001'),
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<RouterProvider router={router} />)
}
