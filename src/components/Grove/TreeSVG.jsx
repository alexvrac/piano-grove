// Chaque stade a sa propre forme d'arbre, dessinée avec des formes SVG de base
// La couleur est passée en prop pour personnaliser chaque arbre

const TREE_SHAPES = {
  // Stade 0 : Graine — just un petit renflement sous terre
  0: ({ color }) => (
    <g>
      <ellipse cx="32" cy="62" rx="14" ry="4" fill={color} opacity="0.15" />
      <ellipse cx="32" cy="58" rx="8" ry="6" fill={color} opacity="0.5" />
      {/* Petite fissure qui s'ouvre */}
      <path d="M29 56 Q32 52 35 56" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
    </g>
  ),

  // Stade 1 : Pousse — tige fine et premières feuilles
  1: ({ color }) => (
    <g>
      <ellipse cx="32" cy="66" rx="16" ry="4" fill={color} opacity="0.15" />
      {/* Tige */}
      <path d="M32 65 Q30 55 32 44" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      {/* Première feuille gauche */}
      <path d="M32 50 Q24 46 26 40 Q30 44 32 50Z" fill={color} opacity="0.75" />
      {/* Première feuille droite */}
      <path d="M32 48 Q40 44 38 38 Q34 42 32 48Z" fill={color} opacity="0.75" />
    </g>
  ),

  // Stade 2 : Jeune arbre — tronc et feuillage rond
  2: ({ color }) => (
    <g>
      <ellipse cx="32" cy="68" rx="18" ry="4" fill={color} opacity="0.2" />
      {/* Tronc */}
      <rect x="29" y="40" width="6" height="28" rx="3" fill={color} opacity="0.5" />
      {/* Feuillage principal */}
      <ellipse cx="32" cy="32" rx="17" ry="14" fill={color} opacity="0.65" />
      {/* Sous-feuillages */}
      <ellipse cx="20" cy="38" rx="11" ry="8" fill={color} opacity="0.5" />
      <ellipse cx="44" cy="38" rx="11" ry="8" fill={color} opacity="0.5" />
    </g>
  ),

  // Stade 3 : En fleurs — fleurs blanches apparaissent
  3: ({ color }) => (
    <g>
      <ellipse cx="32" cy="68" rx="20" ry="4" fill={color} opacity="0.2" />
      <rect x="29" y="36" width="6" height="32" rx="3" fill={color} opacity="0.45" />
      <ellipse cx="32" cy="26" rx="21" ry="17" fill={color} opacity="0.6" />
      <ellipse cx="18" cy="32" rx="13" ry="10" fill={color} opacity="0.45" />
      <ellipse cx="46" cy="32" rx="13" ry="10" fill={color} opacity="0.45" />
      <ellipse cx="32" cy="16" rx="11" ry="9" fill={color} opacity="0.55" />
      {/* Fleurs */}
      <circle cx="22" cy="24" r="3" fill="white" opacity="0.8" />
      <circle cx="44" cy="20" r="2.5" fill="white" opacity="0.8" />
      <circle cx="34" cy="12" r="2" fill="white" opacity="0.9" />
      <circle cx="18" cy="34" r="2" fill="white" opacity="0.7" />
      <circle cx="48" cy="30" r="2" fill="white" opacity="0.7" />
    </g>
  ),

  // Stade 4 : Arbre ancien — majestueux, branches étendues, magie
  4: ({ color }) => (
    <g>
      <ellipse cx="32" cy="69" rx="24" ry="5" fill={color} opacity="0.25" />
      {/* Tronc épais */}
      <path d="M28 68 Q26 50 29 32 L35 32 Q38 50 36 68Z" fill={color} opacity="0.4" />
      {/* Grandes branches */}
      <path d="M32 40 Q18 35 12 25" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.4" />
      <path d="M32 38 Q46 33 52 23" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.4" />
      {/* Feuillage central */}
      <ellipse cx="32" cy="20" rx="25" ry="21" fill={color} opacity="0.55" />
      <ellipse cx="14" cy="28" rx="16" ry="12" fill={color} opacity="0.42" />
      <ellipse cx="50" cy="28" rx="16" ry="12" fill={color} opacity="0.42" />
      <ellipse cx="32" cy="8" rx="14" ry="11" fill={color} opacity="0.52" />
      {/* Fleurs */}
      <circle cx="18" cy="18" r="3.5" fill="white" opacity="0.75" />
      <circle cx="48" cy="14" r="3" fill="white" opacity="0.75" />
      <circle cx="32" cy="5" r="2.5" fill="white" opacity="0.85" />
      <circle cx="42" cy="24" r="2.5" fill="white" opacity="0.65" />
      <circle cx="22" cy="30" r="2" fill="white" opacity="0.6" />
      {/* Étoiles magiques */}
      <g opacity="0.6">
        <path d="M10 20 L11.5 17 L13 20 L10 18.5 L13 18.5Z" fill="#ffd166" />
        <path d="M52 18 L53.2 15.5 L54.4 18 L52 16.8 L54.4 16.8Z" fill="#ffd166" />
      </g>
    </g>
  ),
};

export function TreeSVG({ stage, color, size = 72 }) {
  const Shape = TREE_SHAPES[Math.min(stage, 4)];
  const viewBoxSize = 64;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <Shape color={color} />
    </svg>
  );
}