import axios from "../../components/OrderAxios/OrderAxios"
import {put,call} from 'redux-saga/effects'
import { fetchIngredientfail,fetchIngredientSuccess } from "../actions/builder"


export function* builderSaga(action) {
    try {
        const response=yield call(axios,'/ingredients.json')
            let ingredients=response.data
            let ingsOrdered={
                cheese:ingredients.cheese,
                lettuce:ingredients.lettuce,
                beef:ingredients.beef,
                tomato:ingredients.tomato,
                onion:ingredients.onion,
            }
            yield put(fetchIngredientSuccess(ingsOrdered))
    } catch (error) {
        yield put(fetchIngredientfail(error.message))
    }
        
}
