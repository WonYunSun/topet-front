import { configureStore } from '@reduxjs/toolkit'
import petListReducer from './reducers/petListReducer';
import memberReducer from './reducers/memberReducer';

const store = configureStore({
    reducer : {
        petList : petListReducer,
        member : memberReducer,
    }
})



export default store;