export interface UpdatePaymentDto {
  interest_amount?: number;
  principal_amount?: number;
  payment_at?: Date;
  note?: string;
}
