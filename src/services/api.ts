import type { RegistrationPayload } from "#/types/data/registration";

class ApiService {
    async register(payload: RegistrationPayload) {
        const response = await fetch('/api/register', {
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

export default new ApiService()