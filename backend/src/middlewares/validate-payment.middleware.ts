import type { Request, Response, NextFunction } from "express";

export const validateCreatePayment = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { interest_amount, principal_amount, loan_id, note } = req.body;

  if (
    interest_amount === undefined ||
    principal_amount === undefined ||
    loan_id === undefined
  ) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  if (typeof interest_amount !== "number" || interest_amount < 0) {
    return res.status(400).json({
      error: "Invalid interest amount",
    });
  }

  if (typeof principal_amount !== "number" || principal_amount < 0) {
    return res.status(400).json({
      error: "Invalid principal amount",
    });
  }

  if (interest_amount === 0 && principal_amount === 0) {
    return res.status(400).json({
      error: "At least one payment amount must be greater than zero",
    });
  }

  if (!Number.isInteger(loan_id) || loan_id <= 0) {
    return res.status(400).json({
      error: "Invalid loan ID",
    });
  }

  if (note !== undefined && typeof note !== "string") {
    return res.status(400).json({
      error: "Note must be a string",
    });
  }

  next();
};
