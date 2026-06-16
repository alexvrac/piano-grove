import { TreeCard } from "./TreeCard";
import styles from "./Grove.module.css";


export function Grove({
  pieces,
  onSelectPiece,
  onAddPiece
}) {

  return (
    <div className={styles.grove}>

      {pieces.length === 0 && (
        <div className={styles.empty}>
          🌱
          <p>
            Ta forêt est vide...
            <br/>
            Plante ta première graine !
          </p>
        </div>
      )}


      {pieces.map(piece => (

        <TreeCard
          key={piece.id}
          piece={piece}
          onClick={() => onSelectPiece(piece.id)}
        />

      ))}


      <button
        className={styles.add}
        onClick={onAddPiece}
      >
        🌱 Nouvelle graine
      </button>


    </div>
  );
}