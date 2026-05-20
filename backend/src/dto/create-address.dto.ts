import type { AddressType } from "../types/enums.js";

export interface CreateAddressDto {
  neighborhood: string;
  longitude: number;
  latitude: number;
  type: AddressType;
  client_id: number;
}
