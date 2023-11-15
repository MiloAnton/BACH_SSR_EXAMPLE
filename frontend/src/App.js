import "./App.css";
import Topbar from "./components/topbar";
import { useState, useEffect } from "react";

function App() {
  // Stock de livres en local
  const [books, setBooks] = useState([]);

  // Stock du livre à créer
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published_date, setPublished] = useState('');
  const [genre, setGenre] = useState('');

  // Implémentation de la logique du bouton cliquez-moi
  const [compteur, setCompteur] = useState(0);
  const handleClick = () => {
    setCompteur(compteur + 1);
  };
  // Implémentation de la logique de reset du compteur
  const Reset = () => {
    setCompteur(0);
  };

  useEffect(() => {
    fetch("http://localhost:4000/books", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des livres:", error)
      );
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const bookData = {
      title,
      author,
      published_date,
      genre,
    };

    fetch('http://localhost:4000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Not ok');
    })
  }

  return (
    <>
      <Topbar />
      <div className="App">
        Vous avez cliqué {compteur} fois
        <button className="bouton" onClick={handleClick}>
          Cliquez-moi !
        </button>
        <button className="bouton" onClick={Reset}>
          Reset
        </button>
        <div>
          <h2>Ajouter un nouveau livre</h2>
          <input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Auteur"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date de publication"
            value={published_date}
            onChange={e => setPublished(e.target.value)}
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={e => setGenre(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>
          Ajouter le livre
        </button>
        <div>
          <h2>Liste des livres</h2>
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                {book.title} - {book.author}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
