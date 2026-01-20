import { Registration } from '../../core/entities/Registration';
import { RegistrationRepository } from '../../core/repositories/RegistrationRepository';

export class RegistrationRepositoryImpl implements RegistrationRepository {
  async register(registration: Registration): Promise<void> {
    // Simulate API call
    console.log('Registering user:', registration);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000); // 2 second delay as requested
    });
  }
}
