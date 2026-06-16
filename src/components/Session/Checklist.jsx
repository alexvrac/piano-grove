import styles from "./Checklist.module.css";


export function Checklist({
items,
onToggle
}){


return (

<div className={styles.list}>


{items.map(item=>(

<label
key={item.id}
className={styles.item}
>


<input

type="checkbox"

checked={item.done}

onChange={() =>
onToggle(item.id)
}

/>


<div>

<strong>
{item.category}
</strong>


<p>
{item.text}
</p>


<span>
+{item.xp} XP
</span>


</div>


</label>

))}


</div>

)

}