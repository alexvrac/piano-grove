// data/stages.js — définition des 5 stades de croissance des arbres
// Ce fichier est une source de vérité unique : si tu veux renommer un stade
// ou changer son seuil de progression, tu le fais ici et ça se répercute partout.

export const STAGES = [
  {
    id: 0,
    name: 'Graine',
    emoji: '🌰',
    minProgress: 0,
    maxProgress: 19,
    description: 'La pièce vient d\'être plantée. Tout commence ici.',
    unlockMessage: 'Une nouvelle graine rejoint ton bosquet ! 🌰',
  },
  {
    id: 1,
    name: 'Pousse',
    emoji: '🌱',
    minProgress: 20,
    maxProgress: 39,
    description: 'Les premières notes commencent à prendre racine.',
    unlockMessage: 'Ta graine a germé ! Une pousse émerge... 🌱',
  },
  {
    id: 2,
    name: 'Jeune arbre',
    emoji: '🌿',
    minProgress: 40,
    maxProgress: 64,
    description: 'La structure est là. L\'arbre grandit en confiance.',
    unlockMessage: 'Un jeune arbre s\'élève dans ton bosquet ! 🌿',
  },
  {
    id: 3,
    name: 'En fleurs',
    emoji: '🌸',
    minProgress: 65,
    maxProgress: 84,
    description: 'La pièce s\'épanouit. La musique devient poésie.',
    unlockMessage: 'Ton arbre est en fleurs ! La forêt chante. 🌸',
  },
  {
    id: 4,
    name: 'Arbre ancien',
    emoji: '🌳',
    minProgress: 85,
    maxProgress: 100,
    description: 'Maîtrise profonde. Cet arbre est une légende du bosquet.',
    unlockMessage: 'Un arbre ancien est né ! Sa magie illumine tout le bosquet. ✨',
  },
];

// Fonction utilitaire : retourne le stade correspondant à une progression
export function getStageByProgress(progress) {
  return STAGES.find(s => progress >= s.minProgress && progress <= s.maxProgress) || STAGES[0];
}