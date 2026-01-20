import { Registration } from '../entities/Registration';
import { RegistrationRepository } from '../repositories/RegistrationRepository';

export class RegisterUserUseCase {
  constructor(private repository: RegistrationRepository) {}

  async execute(registration: Registration): Promise<void> {
    // Basic validation logic can go here if needed
    if (!registration.fullName || registration.fullName.trim().length === 0) {
      throw new Error('Full name is required');
    }
    
    if (!registration.phoneNumber || registration.phoneNumber.length < 10) {
      throw new Error('Valid phone number is required');
    }

    if (!registration.password || registration.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    await this.repository.register(registration);
  }
}
