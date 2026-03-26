import { db } from "../config/database.js";

export const NameModel = {
  create: async (name: string) => {
    const result = await db.query(
      "INSERT INTO names (name) VALUES ($1) RETURNING *",
      [name]
    );
    return result.rows[0];
  },

  getAll: async () => {
    const result = await db.query(
      "SELECT * FROM names ORDER BY id DESC"
    );
    return result.rows;
  },

  getById: async (id: number) => {
    const result = await db.query(
      "SELECT * FROM names WHERE id = $1",
      [id]
    );
    return result.rows[0];
  },

  update: async (id: number, name: string) => {
    const result = await db.query(
      "UPDATE names SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    return result.rows[0];
  },

  delete: async (id: number) => {
    await db.query(
      "DELETE FROM names WHERE id = $1",
      [id]
    );
    return { message: "Deleted successfully" };
  }
};