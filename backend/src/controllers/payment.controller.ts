import type { Request, Response } from "express";
import { PaymentService } from "../services/payment.service.js";

export class PaymentController {
  static async getAllPayments(req: Request, res: Response) {
    try {
      const payments = await PaymentService.getAllPayments();
      return res.status(200).json(payments);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server error" });
    }
  }

  static async getPaymentById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const payment = await PaymentService.getPaymentById(id);

      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }

      return res.status(200).json(payment);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server error" });
    }
  }

  static async createPayment(req: Request, res: Response) {
    try {
      const paymentData = req.body;
      const newPayment = await PaymentService.createPayment(paymentData);

      return res.status(201).json(newPayment);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal Server error" });
    }
  }

  static async getPaymentsByLoanId(req: Request, res: Response) {
    try {
      const loanId = Number(req.params.loanId);

      const payments = await PaymentService.getPaymentsByLoanId(loanId);

      return res.status(200).json(payments);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server error" });
    }
  }
}
