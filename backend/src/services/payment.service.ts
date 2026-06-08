import type { CreatePaymentDto } from "../dto/payment/create-payment.dto.js";
import { LoanRepository } from "../repositories/loan.repository.js";
import { PaymentRepository } from "../repositories/payment.repository.js";

export class PaymentService {
  static async getAllPayments() {
    return await PaymentRepository.findAll();
  }

  static async getPaymentById(id: number) {
    return await PaymentRepository.findById(id);
  }

  static async createPayment(paymentData: CreatePaymentDto) {
    const loan = await LoanRepository.findById(paymentData.loan_id);

    if (!loan) {
      throw new Error("Loan not found");
    }

    if (loan.status !== "active") {
      throw new Error("Cannot register payment for inactive loan");
    }

    const totals = await PaymentRepository.findTotalPaymentsByLoanId(
      paymentData.loan_id,
    );

    const currentBalance = loan.amount - totals.total_principal;

    if (paymentData.principal_amount > currentBalance) {
      throw new Error("Principal payment exceeds current balance");
    }

    const payment = await PaymentRepository.create(paymentData);

    const newBalance = currentBalance - paymentData.principal_amount;

    if (newBalance === 0) {
      await LoanRepository.update(paymentData.loan_id, {
        status: "paid",
      });
    }

    return payment;
  }

  static async getPaymentsByLoanId(loanId: number) {
    return await PaymentRepository.findByLoanId(loanId);
  }

  static async getPaymentTotalsByLoanId(loanId: number) {
    return await PaymentRepository.findTotalPaymentsByLoanId(loanId);
  }
}
