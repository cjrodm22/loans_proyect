import type { CurrencyType, LoanStatus } from "../../types/enums.js";

export interface UpdateLoanDto {
  amount?: number;
  currency?: CurrencyType;
  interest_rate?: number;
  due_day?: number;
  status?: LoanStatus;
}
