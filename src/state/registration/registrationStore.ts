import type { RegistrationPayload } from '#/types/data/registration';
import { createStore } from 'zustand';

interface RegistrationState {
    // The payload for the registration.
    payload?: RegistrationPayload;
    // Sets the payload for the registration. Used to replace the entire payload.
    replacePayload: (payload: RegistrationPayload) => void;
    // Merges the payload with the existing payload. Used to update the payload.
    updatePayload: (payload: Partial<RegistrationPayload>) => void;
}

export type RegistrationStore = ReturnType<typeof createRegistrationStore>;

export const createRegistrationStore = () => {
  return createStore<RegistrationState>()((set) => ({
    payload: {},
    replacePayload: (payload) => set({ payload }),
    updatePayload: (payload) => set((state) => ({ payload: { ...state.payload, ...payload } })),
}));
};