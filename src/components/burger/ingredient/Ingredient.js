import styles from "./ingredient.module.css"

const Ingredient=props=>{
    let ingredint=null
    switch (props.type) {
        case 'topBun':
            ingredint=<div className={styles.topBun}></div>
            break;
        case 'bottomBun':
                ingredint=<div className={styles.bottomBun}></div>
            break;
        case 'lettuce':
                ingredint=<div className={styles.lettuce}></div>
            break;
        case 'tomato':
                ingredint=<div className={styles.tomato}></div>
            break;
        case 'beef':
                ingredint=<div className={styles.beef}></div>
            break;
        case 'cheese':
                ingredint=<div className={styles.cheese}></div>
            break;
        case 'onion':
                ingredint=<div className={styles.onion}></div>
            break;
        default:
            ingredint=null
            break;
    }
    return (
        <>
         {ingredint}
        </>
        )
}

export default Ingredient
