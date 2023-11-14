import "./App.css";
import Topbar from "./components/topbar";
import { useState, useEffect } from "react";

function App() {
  // Stock de livres en local
  const [books, setBooks] = useState([]);

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
    fetch("http://localhost:4000/books") // Remplacez par l'URL de votre API
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des livres:", error)
      );
  }, []);

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
