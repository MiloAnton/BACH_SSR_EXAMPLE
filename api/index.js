const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());

// Configuration de la connexion à la base de données
const pool = new Pool({
  user: 'user', // Votre nom d'utilisateur pour PostgreSQL
  host: 'localhost', // L'adresse de l'hôte de la base de données
  database: 'librarydb', // Le nom de votre base de données
  password: 'password', // Votre mot de passe pour PostgreSQL
  port: 5432, // Le port sur lequel PostgreSQL écoute
});

// Un exemple de route qui interroge la base de données et récupère tout les livres
app.get('/books', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM books');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur du serveur');
  }
});

app.listen(port, () => {
  console.log(`Application Express écoutant sur le port ${port}`);
});
