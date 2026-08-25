import mysql, {
  type Pool,
  type ResultSetHeader,
  type RowDataPacket,
} from "mysql2/promise";

let pool: Pool | null = null;

export type DbValue =
  | string
  | number
  | bigint
  | boolean
  | Date
  | null
  | Blob
  | Buffer
  | Uint8Array
  | DbValue[]
  | { [key: string]: DbValue };

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST ?? "localhost",
      port: Number(process.env.DB_PORT ?? 3306),
      user: process.env.DB_USER ?? "root",
      password: process.env.DB_PASSWORD ?? "",
      database: process.env.DB_NAME ?? "portfolio_db",
      waitForConnections: true,
      connectionLimit: 10,
      namedPlaceholders: false,
      charset: "utf8mb4",
    });
  }

  return pool;
}

export async function query<T>(sql: string, params: DbValue[] = []) {
  const [rows] = await getPool().execute<RowDataPacket[]>(sql, params);
  return rows as T[];
}

export async function queryOne<T>(sql: string, params: DbValue[] = []) {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}

export async function execute(sql: string, params: DbValue[] = []) {
  const [result] = await getPool().execute<ResultSetHeader>(sql, params);
  return result;
}
