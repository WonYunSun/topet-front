let initialState = {
    petList : {},
};

const SET_PET_LIST = 'SET_PET_LIST'

export const setPetList = (petList) => ({
    type : SET_PET_LIST,
    payload : petList,
});

function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_PET_LIST:
            return {
                ...state, petList : action.payload,
            }
        default :
            return state;
    }
}

export default reducer;