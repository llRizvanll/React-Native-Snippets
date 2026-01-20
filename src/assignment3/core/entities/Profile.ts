export type Occupation = 'Developer' | 'Designer' | 'Student' | 'Other';

export interface Profile {
  // Step 1: Personal
  firstName: string;
  lastName: string;
  dob: string;
  
  // Step 2: Account
  email: string;
  password: string;
  
  // Step 3: Professional
  occupation: Occupation;
  company?: string;
  skills: string[];
}

export const INITIAL_PROFILE: Profile = {
  firstName: '',
  lastName: '',
  dob: '',
  email: '',
  password: '',
  occupation: 'Developer',
  skills: [],
};
