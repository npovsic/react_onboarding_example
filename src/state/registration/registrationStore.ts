import type { RegistrationPayload } from '#/types/data/registration';
import { createContext, useContext } from 'react';
import { createStore, useStore } from 'zustand';

interface RegistrationState {
    // The payload for the registration.
    payload?: RegistrationPayload;
    // Sets the payload for the registration. Used to replace the entire payload.
    replacePayload: (payload: RegistrationPayload) => void;
    // Merges the payload with the existing payload. Used to update the payload.
    updatePayload: (payload: Partial<RegistrationPayload>) => void;
}

export const createRegistrationStore = createStore<RegistrationState>()((set) => ({
    payload: {},
    replacePayload: (payload) => set({ payload }),
    updatePayload: (payload) => set((state) => ({ payload: { ...state.payload, ...payload } })),
}));

export const RegistrationContext = createContext<typeof createRegistrationStore | null>(null);

export function useRegisterStore<T>(selector: (state: RegistrationState) => T): T {
    const store = useContext(RegistrationContext);
    
    if (!store) throw new Error('useRegistrationStore must be used within RegistrationContextProvider');
    
    return useStore(store, selector);
  }