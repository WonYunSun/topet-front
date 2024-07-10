import { createSlice } from "@reduxjs/toolkit"; //신버전 redux createSlice는 reducer 만드는 것을 도와줌

let initialState = {
    dog_community_freedomAndDaily : [],
    dog_community_curious : [],
    dog_community_sharingInformation : [],

    cat_community_freedomAndDaily : [],
    cat_community_curious : [],
    cat_community_sharingInformation : [],

    exoticpet_community_freedomAndDaily : [],
    exoticpet_community_curious : [],
    exoticpet_community_sharingInformation : [],
};


const communityPostsSlice = createSlice({
    //필수 태그 3개 name, initialState, reducers
    name : 'community_posts',
    initialState,
    reducers : { // reducers는 모두 함수로 이루어져야 함.
        updateCommunityPosts(state, action) { //state, action을 매개변수로 받음
            const { category, data } = action.payload;
            state[category] = data;

            
        },
    }
})

export const { updateCommunityPosts } = communityPostsSlice.actions; //dispatch에서 쓰기 위해 action을 export
export default communityPostsSlice.reducer; //reducers를 하나의 큰 reducer로 만들어주기 때문에 export 할 때는 reducer로 해야 함.


