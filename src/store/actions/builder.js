import * as actionType from "../actionTypes"
import axios from "../../components/OrderAxios/OrderAxios"

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
    return dispatch=>{
        axios.get('/ingredients.json').then(response=>{
            let ingredients=response.data
            let ingsOrdered={
                cheese:ingredients.cheese,
                lettuce:ingredients.lettuce,
                beef:ingredients.beef,
                tomato:ingredients.tomato,
                onion:ingredients.onion,
            }
            dispatch(fetchIngredientSuccess(ingsOrdered))
        }).catch(e=>{
            dispatch(fetchIngredientfail(e.message))
        })
    }
}
