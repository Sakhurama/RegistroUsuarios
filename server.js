const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const mysql = require("mysql2");
const cors = require('cors');


app.use(bodyParser.json());

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    database: "mi_bdd",
});

db.connect((err) => {
    if (err) {
        console.log("Error de conexión a la base de datos", err);
        return;
    }
    console.log("Conectado a la base de datos");
});

app.post("/save-data", (req, res) => {
    const { nombre, email, apellido } = req.body;
    console.log("Datos recibidos:", nombre, email, apellido);

    const query = "INSERT INTO usuarios (nombre, email, apellido) VALUES (?, ?, ?)";
    db.query(query, [nombre, email, apellido], (err, result) => {
        if (err) {
            console.log("Error al guardar los datos", err);
            res.status(500).send("Error al guardar los datos");
            return;
        } else {
            console.log("Datos guardados correctamente: ", result);
            res.status(200).send("Datos guardados correctamente");
        }
    });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));