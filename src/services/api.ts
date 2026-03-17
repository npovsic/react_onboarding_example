import type { RegistrationPayload } from "#/types/data/registration";

class ApiService {
    #baseUrl: string;

    constructor(baseUrl: string) {
        this.#baseUrl = baseUrl;
    }

    async register(payload: RegistrationPayload) {
        const response = await fetch(`${this.#baseUrl}/api/register`, {
            method: 'POST',
            body: JSON.stringify(payload),
        })

        if (!response.ok) {
            // throw new Error('Failed to register')
            
            return {
                success: true,
            }
        }

        return response.json()
    }
}

export default ApiService;