import { configureStore } from '@reduxjs/toolkit'
import petListReducer from './reducers/petListReducer';
import communityPosts from './reducers/communityPosts';

const store = configureStore({
    reducer : {
        petList : petListReducer,
        communityPosts: communityPosts,
    }
})



export default store;