export const QUEST_DEFINITIONS = {
  'roots-deep': {
    id: 'roots-deep',
    name: 'Racines profondes',
    description: '7 jours de pratique consécutifs',
    icon: '🌱',
    total: 7,
    xpReward: 300,
    // Condition vérifiée automatiquement
    checkCondition: (profile) => Math.min(profile.streakDays, 7),
  },
  'explorer': {
    id: 'explorer',
    name: 'L\'Exploratrice',
    description: 'Travailler 3 pièces différentes cette semaine',
    icon: '🗺️',
    total: 3,
    xpReward: 200,
    checkCondition: (profile, pieces) => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Set(
        pieces
          .filter(p => p.lastSessionAt && new Date(p.lastSessionAt) > oneWeekAgo)
          .map(p => p.id)
      ).size;
    },
  },
  'grand-wind': {
    id: 'grand-wind',
    name: 'Le Grand Vent',
    description: 'Jouer une pièce entière sans s&apos;arrêter (cocher le run-through)',
    icon: '🍃',
    total: 1,
    xpReward: 150,
    checkCondition: () => 0, // Complétée manuellement via session
  },
  'patience': {
    id: 'patience',
    name: 'La Patience du Chêne',
    description: 'Réviser une pièce déjà maîtrisée (>85%)',
    icon: '🌳',
    total: 1,
    xpReward: 180,
    checkCondition: (profile, pieces) =>
      pieces.filter(p => p.progress >= 85 &&
        p.lastSessionAt &&
        new Date(p.lastSessionAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length > 0 ? 1 : 0,
  },
  'night-owl': {
    id: 'night-owl',
    name: 'La Chouette Nocturne',
    description: 'Pratiquer après 22h',
    icon: '🦉',
    total: 1,
    xpReward: 100,
    checkCondition: () => {
      const hour = new Date().getHours();
      return hour >= 22 || hour < 4 ? 1 : 0;
    },
  },
  'ancient-grove': {
    id: 'ancient-grove',
    name: 'Le Grove Ancien',
    description: 'Faire pousser un arbre jusqu&apos;au stade Arbre Ancien',
    icon: '✨',
    total: 1,
    xpReward: 500,
    checkCondition: (profile, pieces) =>
      pieces.filter(p => p.stage >= 4).length > 0 ? 1 : 0,
  },
};