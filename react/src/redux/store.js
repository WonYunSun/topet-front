import { configureStore } from '@reduxjs/toolkit'
import petListReducer from './reducers/petListReducer';


const store = configureStore({
    reducer : {
        petList : petListReducer,
    }
})



export default store;