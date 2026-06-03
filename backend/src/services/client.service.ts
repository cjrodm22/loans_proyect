import type { CreateClientDto } from "../dto/client/create-client.dto.js";
import type { UpdateClientDto } from "../dto/client/update-client.dto.js";
import { ClientRepository } from "../repositories/client.repository.js";

export class ClientService {
  static async getAllClients() {
    return await ClientRepository.findAll();
  }

  static async getClientById(id: number) {
    return await ClientRepository.findById(id);
  }
  static async createClient(clientData: CreateClientDto) {
    return await ClientRepository.create(clientData);
  }
  static async updateClient(id: number, clientData: UpdateClientDto) {
    return await ClientRepository.update(id, clientData);
  }
  static async inactivateClient(id: number) {
    return await ClientRepository.inactivate(id);
  }

  static async activateClient(id: number) {
    return await ClientRepository.activate(id);
  }
}
