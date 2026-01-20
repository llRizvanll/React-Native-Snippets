export type EventType = 'Webinar' | 'Workshop' | 'Conference';

export interface Registration {
  fullName: string;
  phoneNumber: string;
  password: string;
  eventType: EventType;
  receiveUpdates: boolean;
  dietaryRequirements?: string;
}
