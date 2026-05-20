export interface CreatePaymentDto {
  interest_amount: number;
  principal_amount: number;
  loan_id: number;
  note?: string;
  payment_at?: Date;
}
