import { pool } from "../config/db.js";
import type { Client } from "../types/client.js";
import type { CreateClientDto } from "../dto/client/create-client.dto.js";
import type { UpdateClientDto } from "../dto/client/update-client.dto.js";

export class ClientRepository {
  static async findAll(): Promise<Client[]> {
    const result = await pool.query("SELECT * FROM clients ORDER BY id ASC;");
    return result.rows;
  }

  static async findActive(): Promise<Client[]> {
    const result = await pool.query(
      "SELECT * FROM clients WHERE is_active = true ORDER BY id ASC;",
    );
    return result.rows;
  }

  static async findById(id: number): Promise<Client | null> {
    const result = await pool.query("SELECT * FROM clients WHERE id = $1;", [
      id,
    ]);
    return result.rows[0] ?? null;
  }

  static async create(clientData: CreateClientDto): Promise<Client> {
    const result = await pool.query(
      "INSERT INTO clients (name, dni,is_active,created_at) VALUES ($1, $2, true, now()) RETURNING *;",
      [clientData.name, clientData.dni],
    );
    return result.rows[0];
  }

  static async update(
    id: number,
    clientData: UpdateClientDto,
  ): Promise<Client | null> {
    const result = await pool.query<Client>(
      `UPDATE client SET 
       name = COALESCE($1, name),
        dni = COALESCE($2, dni),
        is_active = COALESCE($3, is_active),
        updated_at = now()
      WHERE id = $4 RETURNING *;`,

      [clientData.name, clientData.dni, clientData.is_active, id],
    );
    return result.rows[0] ?? null;
  }

  static async inactivate(id: number): Promise<Client | null> {
    const result = await pool.query(
      `UPDATE clients SET is_active = false,
       updated_at = now()
      WHERE id = $1 RETURNING *;`,
      [id],
    );
    return result.rows[0] ?? null;
  }

  static async activate(id: number): Promise<Client | null> {
    const result = await pool.query(
      `UPDATE clients SET is_active = true,
       updated_at = now()
      WHERE id = $1 RETURNING *;`,
      [id],
    );

    return result.rows[0] ?? null;
  }
}
