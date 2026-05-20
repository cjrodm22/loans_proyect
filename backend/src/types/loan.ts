import type { CurrencyType, LoanStatus } from "./enums.js";

export interface Loan {
  id: number;
  amount: number;
  currency: CurrencyType;
  interest_rate: number;
  disbursed_at: Date;
  due_day: number;
  status: LoanStatus;
  client_id: number;
  updated_at: Date | null;
}
