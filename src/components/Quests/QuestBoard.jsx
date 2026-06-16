import {
QUEST_DEFINITIONS
} from "../../data/quests";


import styles from "./QuestBoard.module.css";


export function QuestBoard({
quests,
profile,
pieces
}){


return (

<div className={styles.board}>


{
Object.values(QUEST_DEFINITIONS)
.map(q=>{


const current =
q.checkCondition(profile,pieces)
|| 0;


return (

<div
key={q.id}
className={styles.quest}
>


<h3>
{q.icon}
{q.name}
</h3>


<p>
{q.description}
</p>


<div>

{current}/{q.total}

</div>


<div
className={styles.bar}
>

<div

style={{
width:
`${Math.min(
100,
(current/q.total)*100
)}%`
}}

/>

</div>


<footer>
+{q.xpReward} XP
</footer>


</div>


)


})


}


</div>

)

}