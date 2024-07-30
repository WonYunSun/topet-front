import { createSlice } from "@reduxjs/toolkit"; //신버전 redux createSlice는 reducer 만드는 것을 도와줌

let initialState = {
    selectedPet : null
};


const selectedPetSlice = createSlice({
    //필수 태그 3개 name, initialState, reducers
    name : 'selectedPet',
    initialState,
    reducers : { // reducers는 모두 함수로 이루어져야 함.
        updateSelectedPet(state, action) { //state, action을 매개변수로 받음
            state.selectedPet = action.payload
        },
    }
})

export const { updateSelectedPet } = selectedPetSlice.actions;  //dispatch에서 쓰기 위해 action을 export
export default selectedPetSlice.reducer; //reducers를 하나의 큰 reducer로 만들어주기 때문에 export 할 때는 reducer로 해야 함.