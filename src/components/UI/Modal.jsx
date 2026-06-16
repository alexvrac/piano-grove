import styles from "./UI.module.css";


export function Modal({
open,
children,
onClose
}){


if(!open)
return null;


return (

<div className={styles.overlay}>


<div className={styles.modal}>


<button
onClick={onClose}
>
✕
</button>


{children}


</div>


</div>

)

}