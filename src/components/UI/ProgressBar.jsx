import styles from "./UI.module.css";


export function ProgressBar({
value
}){


return (

<div className={styles.track}>

<div

className={styles.fill}

style={{
width:`${value}%`
}}

/>

</div>

)

}