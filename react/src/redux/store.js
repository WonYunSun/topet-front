import { configureStore, combineReducers } from '@reduxjs/toolkit'
import sessionStorage from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import petListReducer from './reducers/petListReducer';
import memberReducer from './reducers/memberReducer';

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
};

const rootReducer = combineReducers({
    petList: petListReducer,
    member: memberReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;

// const store = configureStore({
//     reducer : {
//         petList : petListReducer,
//         member : memberReducer,
//     }
// })



// export default store;