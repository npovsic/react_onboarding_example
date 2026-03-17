import type { RegistrationPayload } from '#/types/data/registration';

class ApiService {
  #baseUrl: string;

  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }

  // Just mocked for now.
  async register(payload: RegistrationPayload) {
    await new Promise((resolve) => setTimeout(resolve, 4000));

    try {
      await fetch(`${this.#baseUrl}/api/register`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      return {
        success: true,
      };
    } catch (_) {
      return {
        success: true,
      };
    }
  }
}

export default ApiService;
