export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string | null;
  bio: string | null;
  password?: string;
  email?: string;
}

export interface AuthUser {
  id: string;
  email: string;
}
