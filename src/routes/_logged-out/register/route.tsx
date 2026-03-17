import { createRegistrationStore, type RegistrationStore } from '#/state/registration/registrationStore';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react';

// Declare the registration store at the module level.
let registrationStore: RegistrationStore | undefined;

export const Route = createFileRoute('/_logged-out/register')({
  component: RegisterWrapperComponent,
  beforeLoad: async () => {
    // Initialize the store if it doesn't exist.
    if (!registrationStore) {
      registrationStore = createRegistrationStore();
    }

    // Inject the store into the context for this route and all its' children.
    return {
      registrationStore,
    };
  },
})

// This is the wrapper component for the register route.
// It provides the registration context to the entire register route tree.
function RegisterWrapperComponent() {
  useEffect(() => {
    return () => {
      // When the user leaves the registration routes entirely, 
      // clean up the store.
      registrationStore = undefined; 
    };
  }, []);
  
  return (
    <Outlet />
  )
}
