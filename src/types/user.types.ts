export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  skillLevel: string;
  createdAt: Date;
}
