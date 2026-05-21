export interface User {
  id: number;
  name: string;
  username: string;
  password_hash: string;
  email: string;
  email_confirmed_at: Date | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date | null;
}
