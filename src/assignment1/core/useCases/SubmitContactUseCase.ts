import { Contact } from '../entities/Contact';
import { IContactRepository } from '../repositories/IContactRepository';

export class SubmitContactUseCase {
  constructor(private contactRepository: IContactRepository) {}

  async execute(contact: Contact): Promise<boolean> {
    // Business Validation
    if (!contact.name || contact.name.trim().length === 0) {
      throw new Error('Name is required');
    }

    if (!contact.email || !this.isValidEmail(contact.email)) {
      throw new Error('Valid email is required');
    }

    if (contact.message && contact.message.length > 200) {
      throw new Error('Message must be less than 200 characters');
    }

    return await this.contactRepository.submitContact(contact);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
