import { Profile } from '../../core/entities/Profile';
import { ProfileRepository } from '../../core/repositories/ProfileRepository';

/**
 * Mock implementation of ProfileRepository.
 * In a real app, this would use react-native-mmkv or AsyncStorage.
 */
export class ProfileRepositoryImpl implements ProfileRepository {
  private static STORAGE_KEY = '@profile_draft';
  private static memoryStore: Record<string, string> = {};

  async saveDraft(profile: Profile): Promise<void> {
    console.log('Saving profile draft:', profile);
    ProfileRepositoryImpl.memoryStore[ProfileRepositoryImpl.STORAGE_KEY] = JSON.stringify(profile);
    return Promise.resolve();
  }

  async getDraft(): Promise<Profile | null> {
    const data = ProfileRepositoryImpl.memoryStore[ProfileRepositoryImpl.STORAGE_KEY];
    if (data) {
      console.log('Restoring profile draft from memory');
      return Promise.resolve(JSON.parse(data));
    }
    return Promise.resolve(null);
  }

  async submit(profile: Profile): Promise<void> {
    console.log('Submitting final profile:', profile);
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  async clearDraft(): Promise<void> {
    delete ProfileRepositoryImpl.memoryStore[ProfileRepositoryImpl.STORAGE_KEY];
    return Promise.resolve();
  }
}
