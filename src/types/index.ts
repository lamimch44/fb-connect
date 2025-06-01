export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
}

export interface FacebookPage {
  id: string;
  name: string;
  category: string;
  picture: string;
  isConnected: boolean;
  accessToken: string;
}

export interface BusinessInfo {
  assistantName: string;
  description: string;
  chatGptApiKey: string;
  temperature: number;
}

export type OnboardingStep = 'login' | 'connect' | 'info' | 'summary';

declare global {
  interface Window {
    FB: typeof FB;
    fbAsyncInit: () => void;
  }
}