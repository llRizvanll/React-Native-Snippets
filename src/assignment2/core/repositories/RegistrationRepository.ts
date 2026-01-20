import { Registration } from '../entities/Registration';

export interface RegistrationRepository {
  register(registration: Registration): Promise<void>;
}
