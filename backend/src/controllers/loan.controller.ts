import type { Request, Response } from "express";
import { LoanService } from "../services/loan.service.js";

export class LoanController {
  static async getAllLoans(req: Request, res: Response) {
    try {
      const loans = await LoanService.getAllLoans();
      res.status(200).json(loans);
    } catch (error) {
      res.status(500).json({ error: "Internal Server error" });
    }
  }

  static async getLoanById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const loan = await LoanService.getLoanById(id);
      if (!loan) {
        return res.status(404).json({ error: "Loan not found" });
      }

      res.status(200).json(loan);
    } catch (error) {
      res.status(500).json({ error: "Internal Server error" });
    }
  }

  static async createLoan(req: Request, res: Response) {
    try {
      const loanData = req.body;
      const newLoan = await LoanService.createLoan(loanData);
      res.status(201).json(newLoan);
    } catch (error) {
      res.status(500).json({ error: "Internal Server error" });
    }
  }

  static async updateLoan(req: Request, res: Response) {
    try {
      const loanData = req.body;
      const id = Number(req.params.id);
      const updatedLoan = await LoanService.updateLoan(id, loanData);
      if (!updatedLoan) {
        return res.status(404).json({ error: "Loan not found" });
      }
      res.status(200).json(updatedLoan);
    } catch (error) {
      res.status(500).json({ error: "Internal Server error" });
    }
  }

  static async markLoanAsPaid(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const paidLoan = await LoanService.markLoanAsPaid(id);

      if (!paidLoan) {
        return res.status(404).json({ error: "Loan not found" });
      }
      res.status(200).json(paidLoan);
    } catch (error) {
      res.status(500).json({ error: "Internal Server error" });
    }
  }
  static async markLoanAsDefaulted(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const defaultedLoan = await LoanService.markLoanAsDefaulted(id);
      if (!defaultedLoan) {
        return res.status(404).json({ error: "Loan not found" });
      }
      res.status(200).json(defaultedLoan);
    } catch (error) {
      res.status(500).json({ error: "Internal Server error" });
    }
  }

  static async markLoanAsCancelled(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const cancelledLoan = await LoanService.markLoanAsCancelled(id);
      if (!cancelledLoan) {
        return res.status(404).json({ error: "Loan not found" });
      }
      res.status(200).json(cancelledLoan);
    } catch (error) {
      res.status(500).json({ error: "Internal Server error" });
    }
  }
}
