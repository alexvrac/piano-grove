export const WEATHER_STATES = {
  brume: {
    id: 'brume',
    label: 'Nuit de brume',
    emoji: '🌑',
    minStreak: 0,
    maxStreak: 0,
    // Couleurs CSS pour l'ambiance
    skyGradient: ['#1a1a2e', '#16213e'],
    particleColor: '#4a4a6a',
    particleType: 'fog',
    message: 'Absolute blasphemy.',
  },
  pluie: {
    id: 'pluie',
    label: 'Pluie légère',
    emoji: '🌧',
    minStreak: 1,
    maxStreak: 2,
    skyGradient: ['#2c3e50', '#3d5a6e'],
    particleColor: '#7fb3c8',
    particleType: 'rain',
    message: 'Les premières gouttes nourrissent les graines...',
  },
  eclaircies: {
    id: 'eclaircies',
    label: 'Éclaircies',
    emoji: '⛅',
    minStreak: 3,
    maxStreak: 6,
    skyGradient: ['#4a6fa5', '#6b9ec7'],
    particleColor: '#c8dff0',
    particleType: 'clouds',
    message: 'La lumière perce entre les branches...',
  },
  soleil: {
    id: 'soleil',
    label: 'Beau soleil',
    emoji: '☀️',
    minStreak: 7,
    maxStreak: 13,
    skyGradient: ['#2d8a4e', '#52b788'],
    particleColor: '#ffd166',
    particleType: 'sparkles',
    message: 'La forêt chante avec toi !',
  },
  doree: {
    id: 'doree',
    label: 'Journée dorée',
    emoji: '🌟',
    minStreak: 14,
    maxStreak: 20,
    skyGradient: ['#1a6b3c', '#2d9b5a'],
    particleColor: '#f4d03f',
    particleType: 'fireflies',
    message: 'Les esprits de la forêt dansent autour de toi...',
  },
  enchantee: {
    id: 'enchantee',
    label: 'Aube enchantée',
    emoji: '✨',
    minStreak: 21,
    maxStreak: Infinity,
    skyGradient: ['#0d2137', '#1a3a5c'],
    particleColor: '#e8c4ff',
    particleType: 'aurora',
    message: 'Absolute cinema. ✨',
  },
};

export function getWeatherState(streakDays) {
  return Object.values(WEATHER_STATES).find(
    w => streakDays >= w.minStreak && streakDays <= w.maxStreak
  ) || WEATHER_STATES.brume;
}