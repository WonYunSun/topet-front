import { configureStore, combineReducers } from '@reduxjs/toolkit'
import sessionStorage from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import petListReducer from './reducers/petListReducer';
import memberReducer from './reducers/memberReducer';
import selectedPetReducer from './reducers/selectedPetReducer';
import modalReducer from './reducers/modalReducer';


const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    blacklist: ['modal'],
};

const rootReducer = combineReducers({
    petList: petListReducer,
    member: memberReducer,
    selectedPet : selectedPetReducer,
    modal : modalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;