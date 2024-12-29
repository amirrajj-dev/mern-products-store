import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from './products'
const store = configureStore({
    reducer : combineReducers({
        products : productsReducer
    })
})

export default store;