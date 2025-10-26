import express from "express";
import mysql from "mysql2/promise";

const app = express();
const port = 3000;

const {
  MYSQL_HOST = "localhost",
  MYSQL_USER = "root",
  MYSQL_DATABASE = "football_results",
  MYSQL_PORT = 3300
} = process.env;

app.get("/", async (req, res) => {
    const connection = await mysql.createConnection({
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      user: MYSQL_USER,
      database: MYSQL_DATABASE,
    });

    const [rows] = await connection.query("SELECT NOW() AS fecha;");
    await connection.end();
  try {

    res.send(`
      <h1>Hola Mundo desde Node.js + MySQL!</h1>
      <p>Conexión exitosa a la base de datos.</p>
      <p>Fecha desde MySQL: ${rows[0].fecha}</p>
    `);
  } catch (err) {
    console.error("Error conectando a MySQL:", err);
    res.status(500).send("<h1>Error conectando a MySQL 😢</h1>");
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
