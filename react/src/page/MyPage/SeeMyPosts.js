import React, { useEffect, useState } from "react";

import MyPageCommonTopBar from '../../component/MyPageComp/MyPageCommonTopBar'
import CommunityApi from "../../api/communityApi";
import { useSelector, useDispatch } from "react-redux";

const SeeMyPosts = () => {
    const reduxMember = useSelector((state) => state.member.member);
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            let myPosts = await CommunityApi.getMyCommunity(reduxMember.id);
            console.log("myPosts :" ,myPosts)
            setPosts(myPosts);
        } catch (error) {
            console.log(error)
        } finally {
            console.log("end")
        }
        };
        fetchData();
    }, [
        
    ]);
    /*
    animal: "dog"
    author: {id: 1, socialId: '3604958249', name: '이정현', email: 'andre1130@nate.com', profileSrc: null}
    category: "자유/일상"
    comments: null
    content: "5151511551"
    createdTime: "2024-07-30T20:06:00.052511"
    hashtag: ""
    id: 1
    images: []
    likesList: []
    title: "15151515"
    updatedTime:"2024-07-30T20:06:00.052511"
    
    */
    return (
        <div>
            <MyPageCommonTopBar title={'내 게시글'} />
            {posts.map((post, index) => (
            <div key={index}> 
                <p>{post.title}</p>
                <p>{post.author.name}</p>
            </div>
            ))}
        </div>
    )
}

export default SeeMyPosts;