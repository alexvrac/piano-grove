import { TreeSVG } from "./TreeSVG";
import styles from "./TreeCard.module.css";


export function TreeCard({
  piece,
  onClick
}) {


return (

<button
className={styles.card}
onClick={onClick}
>


<div className={styles.tree}>
<TreeSVG
stage={piece.stage}
color={piece.color}
/>
</div>


<h3>
{piece.name}
</h3>


<p>
{piece.composer}
</p>


<div className={styles.progress}>

<div
className={styles.bar}
style={{
width:`${piece.progress}%`
}}
/>

</div>


<span>
{piece.progress} %
</span>


<div className={styles.status}>
{getStatus(piece.stage)}
</div>


</button>

)

}


function getStatus(stage){

const states=[
"🌰 Graine",
"🌱 Pousse",
"🌿 Jeune arbre",
"🌳 Arbre fleuri",
"✨ Ancien"
]

return states[stage] ?? states[0];

}