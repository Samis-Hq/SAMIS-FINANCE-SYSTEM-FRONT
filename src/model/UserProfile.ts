export interface UserProfile {
    id: string;
    name: string;
    phone: string;
    role: string;
    email: string;
    image:File | null;
  }