import mysql from "mysql2/promise";

export async function connectDB() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",   // change accordingly
    password: "",
    database: "schooldb",
    port:8000
  });
  return connection;
}
