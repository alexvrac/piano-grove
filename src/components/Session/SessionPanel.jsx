import { useState } from 'react';
import { Checklist } from './Checklist';
import styles from './SessionPanel.module.css';

// La checklist adaptée au niveau pro — tu peux la personnaliser
const DEFAULT_CHECKLIST = [
  {
    id: 'warmup',
    category: 'Échauffement',
    text: 'Gammes, arpèges, exercices de doigtés (10 min)',
    xp: 10,
  },
  {
    id: 'left-hand',
    category: 'Travail analytique',
    text: 'Main gauche seule — sections difficiles au tempo réduit',
    xp: 15,
  },
  {
    id: 'right-hand',
    category: 'Travail analytique',
    text: 'Main droite seule — articulation et phrasé',
    xp: 15,
  },
  {
    id: 'assembly',
    category: 'Assemblage',
    text: 'Les deux mains — sections difficiles, 60% du tempo',
    xp: 20,
  },
  {
    id: 'runthrough',
    category: 'Run-through',
    text: 'Pièce entière ou grand extrait sans s&apos;arrêter',
    xp: 25,
  },
  {
    id: 'evaluation',
    category: 'Bilan',
    text: 'Auto-évaluation et objectif pour la prochaine session',
    xp: 15,
  },
];

export function SessionPanel({ piece, onClose, onComplete }) {
  const [checks, setChecks] = useState(
    DEFAULT_CHECKLIST.map(item => ({ ...item, done: false }))
  );
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(0);
  const [startTime] = useState(Date.now());

  const completedCount = checks.filter(c => c.done).length;
  const earnedXP = checks.filter(c => c.done).reduce((sum, c) => sum + c.xp, 0) + 50;

  const toggleCheck = (checkId) => {
    setChecks(prev =>
      prev.map(c => c.id === checkId ? { ...c, done: !c.done } : c)
    );
  };

  const handleComplete = () => {
    const duration = Math.round((Date.now() - startTime) / 60000); // en minutes
    onComplete({
      pieceId: piece.id,
      checks: completedCount,
      totalChecks: checks.length,
      xpEarned: earnedXP,
      note,
      rating,
      duration,
    });
  };

  return (
    <div className={styles.panel} role="region" aria-label="Session en cours">
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Session — {piece.name}</h2>
          <p className={styles.sub}>{piece.composer}</p>
        </div>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Fermer la session"
        >
          ✕
        </button>
      </div>

      <Checklist items={checks} onToggle={toggleCheck} />

      {/* Zone de notes libres */}
      <div className={styles.noteSection}>
        <label htmlFor="session-note" className={styles.noteLabel}>
          Notes de session
        </label>
        <textarea
          id="session-note"
          className={styles.noteInput}
          placeholder="Ce qui s'est bien passé, les difficultés, l'objectif de demain..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />
      </div>

      {/* Auto-évaluation */}
      <div className={styles.ratingSection}>
        <span className={styles.ratingLabel}>Comment s'est passée la session ?</span>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              className={`${styles.star} ${rating >= star ? styles.active : ''}`}
              onClick={() => setRating(star)}
              aria-label={`${star} étoile${star > 1 ? 's' : ''}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.xpPreview}>
          +{earnedXP} XP ({completedCount}/{checks.length} complétés)
        </div>
        <button
          className={styles.completeBtn}
          onClick={handleComplete}
          disabled={completedCount === 0}
        >
          Enregistrer la session ✨
        </button>
      </div>
    </div>
  );
}