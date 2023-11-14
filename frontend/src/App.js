import './App.css';
import Topbar from "./components/topbar";
import { useState } from 'react';

function App() {
  // Implémentation de la logique du bouton cliquez-moi
  const [compteur, setCompteur] = useState(0);
  const handleClick = () => {
    setCompteur(compteur + 1);
  }
  // Implémentation de la logique de reset du compteur
  const Reset = () => {
    setCompteur(0)
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
      </div>
    </>
  );
}

export default App;
