import { useState, useEffect } from 'react';

const STORAGE_KEY = 'piano-grove-state';

// Données par défaut pour un nouveau compte
const DEFAULT_STATE = {
  pieces: [],
  profile: {
    name: 'Musicienne',
    level: 1,
    totalXP: 0,
    streakDays: 0,
    lastPracticeDate: null,
    longestStreak: 0,
  },
  quests: [
    { id: 'roots-deep', progress: 0, completedAt: null },
    { id: 'explorer', progress: 0, completedAt: null },
    { id: 'grand-wind', progress: 0, completedAt: null },
    { id: 'patience', progress: 0, completedAt: null },
  ],
  settings: {
    theme: 'forest',
    dailyGoalMinutes: 60,
  },
};

export function useStorage() {
  // Initialise le state depuis localStorage (ou les valeurs par défaut)
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        // Fusionne avec les valeurs par défaut pour gérer les nouvelles clés
        return { ...DEFAULT_STATE, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Erreur de lecture localStorage:', e);
    }
    return DEFAULT_STATE;
  });

  // Sauvegarde automatiquement à chaque changement de state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Erreur d écriture localStorage:', e);
    }
  }, [state]);

  // Fonctions de mise à jour (immutables — on ne modifie jamais l'objet directement)
  const updatePiece = (pieceId, updates) => {
    setState(prev => ({
      ...prev,
      pieces: prev.pieces.map(p =>
        p.id === pieceId ? { ...p, ...updates } : p
      ),
    }));
  };

  const addPiece = (piece) => {
    setState(prev => ({
      ...prev,
      pieces: [...prev.pieces, piece],
    }));
  };

  const updateProfile = (updates) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updates },
    }));
  };

  const addSession = (pieceId, session) => {
    setState(prev => ({
      ...prev,
      pieces: prev.pieces.map(p =>
        p.id === pieceId
          ? { ...p, sessions: [...(p.sessions || []), session] }
          : p
      ),
    }));
  };

  const updateQuest = (questId, updates) => {
    setState(prev => ({
      ...prev,
      quests: prev.quests.map(q =>
        q.id === questId ? { ...q, ...updates } : q
      ),
    }));
  };

  return {
    state,
    updatePiece,
    addPiece,
    updateProfile,
    addSession,
    updateQuest,
  };
}