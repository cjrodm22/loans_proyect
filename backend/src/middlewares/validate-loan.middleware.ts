import type { Request, Response, NextFunction } from "express";

export const validateCreateLoan = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { amount, currency, interest_rate, due_day, client_id } = req.body;

  if (
    amount === undefined ||
    currency === undefined ||
    interest_rate === undefined ||
    due_day === undefined ||
    client_id === undefined
  ) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({
      error: "Amount must be greater than zero",
    });
  }

  if (currency !== "usd" && currency !== "nio") {
    return res.status(400).json({
      error: "Invalid currency",
    });
  }

  if (typeof interest_rate !== "number" || interest_rate < 0) {
    return res.status(400).json({
      error: "Invalid interest rate",
    });
  }

  next();
};

export const validateUpdateLoan = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { amount, currency, interest_rate, due_day, status } = req.body;

  if (
    amount === undefined &&
    currency === undefined &&
    interest_rate === undefined &&
    due_day === undefined &&
    status === undefined
  ) {
    return res.status(400).json({
      error: "At least one field is required",
    });
  }

  next();
};
