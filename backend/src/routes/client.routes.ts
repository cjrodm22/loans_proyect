import { Router } from "express";
import { ClientController } from "../controllers/client.controller.js";
import { validateIdParam } from "../middlewares/validate-id-param.middleware.js";
import {
  validateCreateClient,
  validateUpdateClient,
} from "../middlewares/validate-client.middleware.js";

const router = Router();
router.get("/", ClientController.getAllClients);
router.get("/:id", validateIdParam, ClientController.getClientById);
router.post("/", validateCreateClient, ClientController.createClient);
router.patch(
  "/:id",
  validateIdParam,
  validateUpdateClient,
  ClientController.updateClient,
);
router.patch(
  "/:id/inactivate",
  validateIdParam,
  ClientController.inactivateClient,
);
router.patch("/:id/activate", validateIdParam, ClientController.activateClient);

export default router;
