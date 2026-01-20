import { Profile } from '../entities/Profile';

export interface ProfileRepository {
  saveDraft(profile: Profile): Promise<void>;
  getDraft(): Promise<Profile | null>;
  submit(profile: Profile): Promise<void>;
  clearDraft(): Promise<void>;
}
