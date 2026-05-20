import type { PhoneNumberType } from "../../types/enums.js";

export interface UpdateContactNumberDto {
  phone_number?: string;
  type_number?: PhoneNumberType;
}
