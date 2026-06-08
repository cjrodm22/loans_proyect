import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller.js";
import {
  validateIdParam,
  validateLoanIdParam,
} from "../middlewares/validate-id-param.middleware.js";
import { validateCreatePayment } from "../middlewares/validate-payment.middleware.js";

const router = Router();

router.get("/", PaymentController.getAllPayments);
router.get("/:id", validateIdParam, PaymentController.getPaymentById);
router.post("/", validateCreatePayment, PaymentController.createPayment);
router.get(
  "/loan/:loanId",
  validateLoanIdParam,
  PaymentController.getPaymentsByLoanId,
);

export default router;
