import Ingredient from "./ingredient/Ingredient"

const BurgerArt = props => {
    const burgerIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(parseInt(props.ingredients[igKey]))].map((_, i) => {
            return <Ingredient type={igKey} key={igKey + i} />
        })
    }).reduce((arr, elm) => {
        
        // reduce the array to check either ingredient or added or not to diplay add ingredient message
        return (arr.concat(elm))
    }, [])
    return (
        <>
            <Ingredient type="topBun" />
            {burgerIngredients.length ? burgerIngredients : <small>No Ingredient added yet!</small>}
            <Ingredient type="bottomBun" />
        </>
    )
}

export default BurgerArt