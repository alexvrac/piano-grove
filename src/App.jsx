import { useState, useEffect } from 'react';
import { useStorage } from './hooks/useStorage';
import { useStreak } from './hooks/useStreak';
import { ForestWeather } from './components/Weather/ForestWeather';
import { Grove } from './components/Grove/Grove';
import { SessionPanel } from './components/Session/SessionPanel';
import { QuestBoard } from './components/Quests/QuestBoard';
import { computeProgressGain, computeNewStage } from './utils/progression';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css';

function App() {
  const { state, updatePiece, addPiece, updateProfile, addSession, updateQuest } = useStorage();
  const { checkAndUpdateStreak, recordPractice } = useStreak(state.profile, updateProfile);
  const [activeSession, setActiveSession] = useState(null); // pieceId ou null

  // Vérifie le streak au chargement
  useEffect(() => {
    checkAndUpdateStreak();
  }, []);

  const handleStartSession = (pieceId) => {
    setActiveSession(pieceId);
  };

  const handleCloseSession = () => {
    setActiveSession(null);
  };

  const handleCompleteSession = ({ pieceId, checks, totalChecks, xpEarned, note, rating, duration }) => {
    const piece = state.pieces.find(p => p.id === pieceId);
    if (!piece) return;

    // Calcule la progression gagnée
    const progressGain = computeProgressGain(checks, totalChecks);
    const newProgress = Math.min(100, piece.progress + progressGain);
    const newStage = computeNewStage(newProgress);

    // Met à jour la pièce
    updatePiece(pieceId, {
      progress: newProgress,
      stage: newStage,
      lastSessionAt: new Date().toISOString(),
    });

    // Ajoute la session à l'historique
    addSession(pieceId, {
      id: uuidv4(),
      date: new Date().toISOString(),
      duration,
      checksCompleted: checks,
      checksTotal: totalChecks,
      xpEarned,
      note,
      rating,
    });

    // Met à jour l'XP et le niveau
    const newTotalXP = state.profile.totalXP + xpEarned;
    const newLevel = Math.floor(newTotalXP / 500) + 1; // Niveau toutes les 500 XP
    const newStreak = recordPractice();

    updateProfile({
      totalXP: newTotalXP,
      level: newLevel,
    });

    setActiveSession(null);
  };

  const handleAddPiece = () => {
    const name = prompt('Nom de la pièce :');
    if (!name?.trim()) return;
    const composer = prompt('Compositeur :') || '';

    const COLORS = ['#5DCAA5', '#AFA9EC', '#FAC775', '#F4C0D1', '#85B7EB', '#9FE1CB', '#EF9F27'];
    const color = COLORS[state.pieces.length % COLORS.length];

    addPiece({
      id: uuidv4(),
      name: name.trim(),
      composer,
      progress: 0,
      stage: 0,
      color,
      createdAt: new Date().toISOString(),
      lastSessionAt: null,
      sessions: [],
    });
  };

  const activePiece = activeSession
    ? state.pieces.find(p => p.id === activeSession)
    : null;

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.appTitle}>🌳 Piano Grove</h1>
        <div className={styles.profileBadge}>
          <span className={styles.levelBadge}>Niv. {state.profile.level}</span>
          <span className={styles.xpText}>{state.profile.totalXP} XP</span>
        </div>
      </header>

      <main className={styles.main}>
        {/* Widget météo/streak */}
        <ForestWeather streakDays={state.profile.streakDays} />

        {/* Session active */}
        {activePiece && (
          <SessionPanel
            piece={activePiece}
            onClose={handleCloseSession}
            onComplete={handleCompleteSession}
          />
        )}

        {/* Le grove — les arbres */}
        <section aria-label="Ton grove">
          <h2 className={styles.sectionTitle}>Ton grove</h2>
          <Grove
            pieces={state.pieces}
            activePieceId={activeSession}
            onSelectPiece={handleStartSession}
            onAddPiece={handleAddPiece}
          />
        </section>

        {/* Quêtes */}
        <section aria-label="Quêtes actives">
          <h2 className={styles.sectionTitle}>Quêtes</h2>
          <QuestBoard
            quests={state.quests}
            profile={state.profile}
            pieces={state.pieces}
          />
        </section>
      </main>
    </div>
  );
}

export default App;