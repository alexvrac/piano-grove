import { isToday, isYesterday, differenceInDays, parseISO } from 'date-fns';

export function useStreak(profile, updateProfile) {
  // Vérifie et met à jour le streak au chargement de l'app
  const checkAndUpdateStreak = () => {
    if (!profile.lastPracticeDate) return;

    const lastDate = parseISO(profile.lastPracticeDate);
    const daysSinceLast = differenceInDays(new Date(), lastDate);

    // Si plus de 1 jour sans pratique, le streak est brisé
    if (daysSinceLast > 1) {
      updateProfile({ streakDays: 0 });
    }
  };

  // Appelle ça quand une session est enregistrée
  const recordPractice = () => {
    const today = new Date().toISOString().split('T')[0]; // "2024-03-20"
    const lastDate = profile.lastPracticeDate;

    let newStreak = profile.streakDays;

    if (!lastDate) {
      // Première session de toujours
      newStreak = 1;
    } else if (isToday(parseISO(lastDate))) {
      // Déjà pratiqué aujourd'hui — streak inchangé
      newStreak = profile.streakDays;
    } else if (isYesterday(parseISO(lastDate))) {
      // Pratiqué hier — streak +1 !
      newStreak = profile.streakDays + 1;
    } else {
      // Trop longtemps — streak repart de 1
      newStreak = 1;
    }

    updateProfile({
      streakDays: newStreak,
      lastPracticeDate: today,
      longestStreak: Math.max(profile.longestStreak || 0, newStreak),
    });

    return newStreak;
  };

  return { checkAndUpdateStreak, recordPractice };
}