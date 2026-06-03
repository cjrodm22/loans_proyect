import { Router } from "express";
import { LoanController } from "../controllers/loan.controller.js";
import { validateIdParam } from "../middlewares/validate-id-param.middleware.js";
import {
  validateCreateLoan,
  validateUpdateLoan,
} from "../middlewares/validate-loan.middleware.js";

const router = Router();
router.get("/", LoanController.getAllLoans);
router.get("/:id", validateIdParam, LoanController.getLoanById);
router.post("/", validateCreateLoan, LoanController.createLoan);
router.patch(
  "/:id",
  validateIdParam,
  validateUpdateLoan,
  LoanController.updateLoan,
);
router.patch("/:id/pay", validateIdParam, LoanController.markLoanAsPaid);
router.patch(
  "/:id/default",
  validateIdParam,
  LoanController.markLoanAsDefaulted,
);
router.patch(
  "/:id/cancel",
  validateIdParam,
  LoanController.markLoanAsCancelled,
);

export default router;
