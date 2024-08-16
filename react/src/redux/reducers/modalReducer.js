import { createSlice } from "@reduxjs/toolkit"; //신버전 redux createSlice는 reducer 만드는 것을 도와줌

let initialState = {
    modalOpen: false,
    modalMessage: "",
};

const modalSlice = createSlice({
    //필수 태그 3개 name, initialState, reducers
    name: 'modal',
    initialState,
    reducers: { 
        openModal(state, action) { 
            state.modalOpen = action.payload; // modalOpen 상태 업데이트
        },
        setReduxModalMessage(state, action) {
            state.modalMessage = action.payload; // modalMessage 상태 업데이트
        }
    }
});

export const { openModal, setReduxModalMessage } = modalSlice.actions;  //dispatch에서 쓰기 위해 action을 export
export default modalSlice.reducer; //reducers를 하나의 큰 reducer로 만들어주기 때문에 export 할 때는 reducer로 해야 함.
