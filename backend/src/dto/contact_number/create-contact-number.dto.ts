import type { PhoneNumberType } from "../../types/enums.js";

export interface CreateContactNumberDto {
  phone_number: string;
  type_number: PhoneNumberType;
  client_id: number;
}
