import type { CreateLoanDto } from "../dto/loan/create-loan.dto.js";
import type { UpdateLoanDto } from "../dto/loan/update-loan.dto.js";
import { LoanRepository } from "../repositories/loan.repository.js";

export class LoanService {
  static async getAllLoans() {
    return await LoanRepository.findAll();
  }
  static async getLoanById(id: number) {
    return await LoanRepository.findById(id);
  }

  static async createLoan(loanData: CreateLoanDto) {
    return await LoanRepository.create(loanData);
  }

  static async updateLoan(id: number, loanData: UpdateLoanDto) {
    return await LoanRepository.update(id, loanData);
  }

  static async markLoanAsPaid(id: number) {
    return await LoanRepository.update(id, { status: "paid" });
  }

  static async markLoanAsDefaulted(id: number) {
    return await LoanRepository.update(id, { status: "defaulted" });
  }

  static async markLoanAsCancelled(id: number) {
    return await LoanRepository.update(id, { status: "cancelled" });
  }
}
