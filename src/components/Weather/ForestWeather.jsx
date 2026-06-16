import { useEffect, useRef } from 'react';
import { getWeatherState } from '../../utils/weather';
import styles from './ForestWeather.module.css';

// Composant de particules canvas (pluie, lucioles, etc.)
function WeatherCanvas({ weather, streakDays }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Système de particules selon le type de météo
    const particles = [];
    const count = weather.particleType === 'fog' ? 30
      : weather.particleType === 'rain' ? 60
      : weather.particleType === 'sparkles' ? 40
      : 25;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: weather.particleType === 'rain'
          ? Math.random() * 3 + 2
          : (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.7 + 0.1,
        // Phase pour les animations sinusoïdales (lucioles)
        phase: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.beginPath();

        if (weather.particleType === 'rain') {
          // Ligne pour la pluie
          ctx.strokeStyle = weather.particleColor + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 1, p.y + 8);
          ctx.stroke();
        } else if (weather.particleType === 'fireflies') {
          // Cercle pulsant pour les lucioles
          p.phase += 0.05;
          const glowOpacity = (Math.sin(p.phase) + 1) / 2;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = weather.particleColor + Math.floor(glowOpacity * 200 + 55).toString(16).padStart(2, '0');
          ctx.fill();
        } else {
          // Cercle simple pour fog, sparkles, aurora
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = weather.particleColor + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
          ctx.fill();
        }

        // Déplacement
        p.x += p.speedX;
        p.y += p.speedY;

        // Réapparition de l'autre côté
        if (p.y > canvas.height) p.y = 0;
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Nettoyage quand le composant est démonté
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [weather]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}

export function ForestWeather({ streakDays }) {
  const weather = getWeatherState(streakDays);

  return (
    <div
      className={styles.weatherWidget}
      style={{
        background: `linear-gradient(135deg, ${weather.skyGradient[0]}, ${weather.skyGradient[1]})`,
      }}
      role="region"
      aria-label={`Météo de la forêt : ${weather.label}, ${streakDays} jours de streak`}
    >
      <WeatherCanvas weather={weather} streakDays={streakDays} />

      <div className={styles.content}>
        <div className={styles.streakDisplay}>
          <span className={styles.streakNumber}>{streakDays}</span>
          <span className={styles.streakLabel}>jours consécutifs</span>
        </div>

        <div className={styles.weatherInfo}>
          <span className={styles.weatherEmoji} aria-hidden="true">
            {weather.emoji}
          </span>
          <div>
            <div className={styles.weatherName}>{weather.label}</div>
            <div className={styles.weatherMessage}>{weather.message}</div>
          </div>
        </div>

        {/* Barre de progression vers la prochaine météo */}
        {weather.maxStreak !== Infinity && (
          <div className={styles.nextWeather}>
            <span className={styles.nextLabel}>
              Prochaine météo dans {weather.maxStreak - streakDays + 1} jours
            </span>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${((streakDays - weather.minStreak) / (weather.maxStreak - weather.minStreak + 1)) * 100}%`
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}