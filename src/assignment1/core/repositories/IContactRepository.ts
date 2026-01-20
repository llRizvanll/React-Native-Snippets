import { Contact } from '../entities/Contact';

export interface IContactRepository {
  submitContact(contact: Contact): Promise<boolean>;
}
