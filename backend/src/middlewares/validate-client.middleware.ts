import type { Request, Response, NextFunction } from "express";

export const validateCreateClient = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, dni } = req.body;

  if (!name || !dni) {
    return res.status(400).json({
      error: "Name and DNI are required",
    });
  }

  if (typeof name !== "string" || typeof dni !== "string") {
    return res.status(400).json({
      error: "Name and DNI must be strings",
    });
  }

  next();
};

export const validateUpdateClient = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, dni, is_active } = req.body;

  if (name === undefined && dni === undefined && is_active === undefined) {
    return res.status(400).json({
      error: "At least one field is required",
    });
  }

  if (name !== undefined && typeof name !== "string") {
    return res.status(400).json({ error: "Name must be a string" });
  }

  if (dni !== undefined && typeof dni !== "string") {
    return res.status(400).json({ error: "DNI must be a string" });
  }

  if (is_active !== undefined && typeof is_active !== "boolean") {
    return res.status(400).json({ error: "is_active must be a boolean" });
  }

  next();
};
