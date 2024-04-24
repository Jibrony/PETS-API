// routes/pets.js
// esta seccion es avance sobre el proyecto final, incluyendo las query y manejo de mysql
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'nombre_de_tu_base_de_datos'
});

// POST /pets Crear una mascota
router.post('/', (req, res) => {
    const { name, age, breed } = req.body;
    const query = `INSERT INTO pets (name, age, breed) VALUES (?, ?, ?)`;
    connection.query(query, [name, age, breed], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al crear la mascota');
            return;
        }
        res.status(201).send('Mascota creada exitosamente');
    });
});

module.exports = router;

// GET /pets Obtener todas las mascotas
router.get('/', (req, res) => {
    const query = `SELECT * FROM pets`;
    connection.query(query, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener las mascotas');
            return;
        }
        res.json(rows);
    });
});

// GET /pets/:id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM pets WHERE id = ?`;
    connection.query(query, [id], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener la mascota');
            return;
        }
        if (rows.length === 0) {
            res.status(404).send('Mascota no encontrada');
            return;
        }
        res.json(rows[0]);
    });
});

// PUT /pets/:id Obtener una mascota por ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name, age, breed } = req.body;
    const query = `UPDATE pets SET name = ?, age = ?, breed = ? WHERE id = ?`;
    connection.query(query, [name, age, breed, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al actualizar la mascota');
            return;
        }
        res.send('Mascota actualizada exitosamente');
    });
});

// DELETE /pets/:id elimina la mascota por su id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM pets WHERE id = ?`;
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al eliminar la mascota');
            return;
        }
        res.send('Mascota eliminada exitosamente');
    });
});
