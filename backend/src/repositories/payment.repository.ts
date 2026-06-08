import { pool } from "../config/db.js";
import type { CreatePaymentDto } from "../dto/payment/create-payment.dto.js";
import type { Payment } from "../types/payment.js";

export class PaymentRepository {
  static async findAll(): Promise<Payment[]> {
    const result = await pool.query<Payment>(
      `SELECT * FROM payment order by payment_at desc;`,
    );
    return result.rows;
  }

  static async findById(id: number): Promise<Payment | null> {
    const result = await pool.query<Payment>(
      `SELECT * FROM payment WHERE id = $1;`,
      [id],
    );
    return result.rows[0] ?? null;
  }

  static async create(PaymentData: CreatePaymentDto): Promise<Payment> {
    const result = await pool.query<Payment>(
      `INSERT INTO payment (
      interest_amount, 
      principal_amount,
       payment_at,
       created_at,
       note,
       loan_id) 
             VALUES(
             $1,
             $2,
             COALESCE($3, now()), 
             now(),
             COALESCE($4,null),
             $5) 
             RETURNING *;`,
      [
        PaymentData.interest_amount,
        PaymentData.principal_amount,
        PaymentData.payment_at,
        PaymentData.note,
        PaymentData.loan_id,
      ],
    );
    const payment = result.rows[0];
    if (!payment) {
      throw new Error("Failed to create payment");
    }

    return payment;
  }

  static async findByLoanId(loanId: number): Promise<Payment[]> {
    const result = await pool.query<Payment>(
      `SELECT * FROM payment WHERE loan_id = $1 ORDER BY payment_at DESC;`,
      [loanId],
    );
    return result.rows;
  }

  static async findTotalPaymentsByLoanId(loanId: number): Promise<{
    total_interest: number;
    total_principal: number;
  }> {
    const result = await pool.query(
      `SELECT 
        COALESCE(SUM(interest_amount), 0) AS total_interest, 
        COALESCE(SUM(principal_amount), 0) AS total_principal
       FROM payment 
       WHERE loan_id = $1;`,
      [loanId],
    );
    const totals = result.rows[0];
    return {
      total_interest: Number(totals.total_interest),
      total_principal: Number(totals.total_principal),
    };
  }
}
