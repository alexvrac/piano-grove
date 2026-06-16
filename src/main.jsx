// main.jsx — point d'entrée de l'application
// C'est le tout premier fichier exécuté par React.
// Son seul rôle : brancher le composant App sur la div #root de index.html.
// Tu n'auras presque jamais à modifier ce fichier.

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);