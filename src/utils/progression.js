// Calcule le gain de progression après une session
export function computeProgressGain(checksCompleted, checksTotal) {
  if (checksTotal === 0) return 0;
  const ratio = checksCompleted / checksTotal;
  // Gain entre 2% (session minimale) et 8% (session complète)
  return Math.round(ratio * 6 + 2);
}

// Détermine le stade de l'arbre selon la progression
export function computeNewStage(progress) {
  if (progress >= 85) return 4; // Arbre ancien
  if (progress >= 65) return 3; // En fleurs
  if (progress >= 40) return 2; // Jeune arbre
  if (progress >= 20) return 1; // Pousse
  return 0;                     // Graine
}