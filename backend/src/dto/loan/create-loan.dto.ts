import type { CurrencyType, LoanStatus } from "../../types/enums.js";

export interface CreateLoanDto {
  amount: number;
  currency: CurrencyType;
  interest_rate: number;
  due_day: number;
  client_id: number;
  disbursed_at?: Date;
}
