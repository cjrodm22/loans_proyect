import type { AddressType } from "../types/enums.js";

export interface UpdateAddressDto {
  neighborhood?: string;
  longitude?: number;
  latitude?: number;
  type?: AddressType;
}
