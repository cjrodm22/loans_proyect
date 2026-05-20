import type { PhoneNumberType } from "./enums.js";

export interface ClientePhone {
  id: number;
  phone_number: string;
  type_number: PhoneNumberType;
  created_at: Date;
  client_id: number;
  updated_at: Date | null;
}
