import { pool } from "../config/db.js";
import type { CreateLoanDto } from "../dto/loan/create-loan.dto.js";
import type { UpdateLoanDto } from "../dto/loan/update-loan.dto.js";
import type { Loan } from "../types/loan.js";

export class LoanRepository {
  static async findAll(): Promise<Loan[]> {
    const result = await pool.query<Loan>(
      "SELECT * FROM loan ORDER BY id ASC;",
    );
    return result.rows;
  }

  static async findActive(): Promise<Loan[]> {
    const result = await pool.query<Loan>(
      "SELECT * FROM loan WHERE status = 'active' ORDER BY id ASC;",
    );
    return result.rows;
  }

  static async findById(id: number): Promise<Loan | null> {
    const result = await pool.query<Loan>("SELECT * FROM loan WHERE id = $1;", [
      id,
    ]);
    return result.rows[0] ?? null;
  }

  static async create(loanData: CreateLoanDto): Promise<Loan> {
    const result = await pool.query<Loan>(
      `INSERT INTO loan (amount, currency, interest_rate, disbursed_at, due_day, status, client_id) 
       VALUES ($1, $2, $3, COALESCE($4, current_date), $5, 'active', $6) RETURNING *;`,
      [
        loanData.amount,
        loanData.currency,
        loanData.interest_rate,
        loanData.disbursed_at,
        loanData.due_day,
        loanData.client_id,
      ],
    );
    const loan = result.rows[0];

    if (!loan) {
      throw new Error("Failed to create loan");
    }

    return loan;
  }

  static async update(
    id: number,
    loanData: UpdateLoanDto,
  ): Promise<Loan | null> {
    const result = await pool.query<Loan>(
      `UPDATE loan SET 
      AMOUNT = COALESCE($1, amount),
      currency = COALESCE($2, currency),
      interest_rate = COALESCE($3, interest_rate),
      due_day = COALESCE($4, due_day),
      status = COALESCE($5, status),
      updated_at = now()
      WHERE id = $6 RETURNING *;`,
      [
        loanData.amount,
        loanData.currency,
        loanData.interest_rate,
        loanData.due_day,
        loanData.status,
        id,
      ],
    );
    return result.rows[0] ?? null;
  }

  static async markAsDefaulted(id: number): Promise<Loan | null> {
    const result = await pool.query<Loan>(
      ` UPDATE loan
      SET status = 'defaulted',
          updated_at = now()
      WHERE id = $1
      RETURNING *;`,
      [id],
    );
    return result.rows[0] ?? null;
  }

  static async markAsPaid(id: number): Promise<Loan | null> {
    const result = await pool.query<Loan>(
      ` UPDATE loan
      SET status = 'paid',
          updated_at = now()
      WHERE id = $1
      RETURNING *;`,
      [id],
    );
    return result.rows[0] ?? null;
  }

  static async cancel(id: number): Promise<Loan | null> {
    const result = await pool.query<Loan>(
      `
      UPDATE loan
      SET status = 'cancelled',
          updated_at = now()
      WHERE id = $1
      RETURNING *;
      `,
      [id],
    );

    return result.rows[0] ?? null;
  }
}
