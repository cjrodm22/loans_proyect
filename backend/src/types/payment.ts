export interface Payment {
  id: number;
  interest_amount: number;
  principal_amount: number;
  payment_at: Date;
  created_at: Date;
  note: string | null;
  loan_id: number;
}
