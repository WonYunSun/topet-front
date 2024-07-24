import { createSlice } from "@reduxjs/toolkit"; //신버전 redux createSlice는 reducer 만드는 것을 도와줌


let initialState = {
    member : null,
};



const memberSlice = createSlice({
    //필수 태그 3개 name, initialState, reducers
    name : 'member',
    initialState,
    reducers : { // reducers는 모두 함수로 이루어져야 함.
        updateMember(state, action) { //state, action을 매개변수로 받음
            state.member = action.payload
        },
    }
})

export const { updateMember } = memberSlice.actions;  //dispatch에서 쓰기 위해 action을 export
export default memberSlice.reducer; //reducers를 하나의 큰 reducer로 만들어주기 때문에 export 할 때는 reducer로 해야 함.