import { useRef } from "react";
import { RegistrationContext, createRegistrationStore } from "./registrationStore";

// We use a provider to ensure that the store is created only when the component
// is used, we don't need it for the entire app.
export function RegistrationContextProvider({ children }: { children: React.ReactNode }) {
    const registrationStore = useRef(createRegistrationStore);
    
    return (
        <RegistrationContext.Provider value={registrationStore.current}>
            {children}
        </RegistrationContext.Provider>
    );
}