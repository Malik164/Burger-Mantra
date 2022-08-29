import * as actionType from "../actionTypes"

export const changeIngredient=(ingredient,kind)=>{
    return{
        type:actionType.CHANGE_INGREDIENT_NO,
        ingredient,kind

    }
}

// action that will be fired if ingreidients are succesfully loaded
export const fetchIngredientSuccess=(ingredients)=>{
    return{
    type:actionType.FETCH_INGREDIENTS_SUCCESS,
    ingredients
}}
export const fetchIngredientfail=(error)=>({
    type:actionType.FETCH_INGREDIENTS_FAILED,
    error
})

export const resetPrice=()=>({
    type:actionType.RESET_PRICE
})

// now fetch the ingredients from firebase database
export const fetchIngredientsAsync=()=>{
    return {
        type:actionType.FETCH_INGREDIENTS_START
    }
}
