import { Profile } from '../entities/Profile';
import { ProfileRepository } from '../repositories/ProfileRepository';

export class SaveProfileDraftUseCase {
  constructor(private repository: ProfileRepository) {}

  async execute(profile: Profile): Promise<void> {
    await this.repository.saveDraft(profile);
  }
}

export class GetProfileDraftUseCase {
  constructor(private repository: ProfileRepository) {}

  async execute(): Promise<Profile | null> {
    return await this.repository.getDraft();
  }
}

export class SubmitProfileUseCase {
  constructor(private repository: ProfileRepository) {}

  async execute(profile: Profile): Promise<void> {
    // Validation logic for final submission
    if (!profile.email.includes('@')) {
      throw new Error('Invalid email address');
    }
    if (profile.password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    if (profile.skills.length === 0) {
      throw new Error('At least one skill is required');
    }

    await this.repository.submit(profile);
    await this.repository.clearDraft();
  }
}
