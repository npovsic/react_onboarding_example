import { RegistrationContextProvider } from '#/state/registration/registrationContextProvider'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_logged-out/register')({
  component: RegisterWrapperComponent,
})

// This is the wrapper component for the register route.
// It provides the registration context to the entire register route tree.
function RegisterWrapperComponent() {
  return (
    <RegistrationContextProvider>
      <Outlet />
    </RegistrationContextProvider>
  )
}
