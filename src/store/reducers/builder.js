
import * as actionTypes from "../actionTypes"
import { updateObject } from "../utility";
//--------------- REDUX BEST PRACTICES----------------------
//--=> SOTRE Only that state which is shared  amongs components which  is actually redux purpose
//---=> Don't store the input handler like values or modal close b/c they are the local ui state they are no more shared among different components
const priceInfo = [
    {
        label: "lettuce",
        cost: 0.4,
    },
    {
        label: "beef",
        cost: 2.3,
    },
    {
        label: "onion",
        cost: 0.1,
    },
    {
        label: "tomato",
        cost: 0.3,
    },
    {
        label: "cheese",
        cost: 0.7,
    },
];
// initiate the initial state value
const initialState = {
    ingriedients:null,
    totalPrice: 4,
    error:false,
    building:false
}


// function that will handle increment or decrement on based kind of button pressed
function changeHandler(state,action) {
    const {ingredient,kind}=action
            let updatedState={...state}
            // check the target ingredient added or to be removed
            let updatedIngredientsObj={...updatedState.ingriedients}
            let toUpdateCount = updatedIngredientsObj[ingredient];
            // get the previous price
            let toUpdatePrice = updatedState.totalPrice;
            toUpdatePrice = parseFloat(toUpdatePrice);

            let targetPriceObj = priceInfo.filter((elm) => elm.label === ingredient)[0];
            // if add button is clicked
            if (kind === "plus") {
                toUpdateCount = toUpdateCount + 1;
                toUpdatePrice = toUpdatePrice + targetPriceObj.cost;
            }
            // if removed button is clicked
            if (kind === "minus") {
                toUpdateCount = toUpdateCount - 1;
                toUpdatePrice = toUpdatePrice - targetPriceObj.cost;
            }
            return {
                ...state,
                ingriedients:{
                    ...state.ingriedients,
                    [ingredient]:toUpdateCount
                },
                totalPrice:toUpdatePrice,
                building:true
            }
}

const builderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_INGREDIENT_NO: return changeHandler(state,action)
        case actionTypes.FETCH_INGREDIENTS_SUCCESS: 
        return updateObject(state,{error:false,ingriedients:action.ingredients})
        case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state,{error:action.error})
        case actionTypes.RESET_PRICE: return updateObject(state,{totalPrice:4})
        default:return state
    }

}


export default builderReducer