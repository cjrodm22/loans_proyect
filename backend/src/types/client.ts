export interface Client {
  id: number;
  name: string;
  dni: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date | null;
}
