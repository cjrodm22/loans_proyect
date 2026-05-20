import type { AddressType } from "./enums.js";

export interface Address {
  id: number;
  neighborhood: string;
  longitude: number;
  latitude: number;
  type: AddressType;
  created_at: Date;
  client_id: number;
  updated_at: Date | null;
}
