import type { Request, Response } from "express";
import { ClientService } from "../services/client.service.js";

export class ClientController {
  static async getAllClients(req: Request, res: Response) {
    try {
      const clients = await ClientService.getAllClients();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: "Internal Server error" });
    }
  }

  static async getClientById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const client = await ClientService.getClientById(id);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.status(200).json(client);
    } catch (error) {
      res.status(500).json({ error: "Internal Server error" });
    }
  }

  static async createClient(req: Request, res: Response) {
    try {
      const clientData = req.body;
      const newClient = await ClientService.createClient(clientData);
      res.status(201).json(newClient);
    } catch (error) {
      res.status(500).json({ error: "Internal Server error" });
    }
  }

  static async updateClient(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const clientData = req.body;
      const updatedClient = await ClientService.updateClient(id, clientData);
      if (!updatedClient) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.status(200).json(updatedClient);
    } catch (error) {
      res.status(500).json({ error: "Internal Server error" });
    }
  }

  static async inactivateClient(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const inactivatedClient = await ClientService.inactivateClient(id);
      if (!inactivatedClient) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.status(200).json(inactivatedClient);
    } catch (error) {
      res.status(500).json({ error: "Internal Server error" });
    }
  }
  static async activateClient(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const activatedClient = await ClientService.activateClient(id);
      if (!activatedClient) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.status(200).json(activatedClient);
    } catch (error) {
      res.status(500).json({ error: "Internal Server error" });
    }
  }
}
