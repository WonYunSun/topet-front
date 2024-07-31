import React, { useEffect, useState, Suspense } from "react";
import MyPageCommonTopBar from '../../component/MyPageComp/MyPageCommonTopBar'
import CommentApi from "../../api/commentApi";
import ErrorBoundary from "../../component/ErrorComp/ErrorBoundary";
import Loading from "../../component/ErrorComp/Loading";
import wrapPromise from "../../api/wrapPromise";
import { useNavigate } from "react-router-dom";


const SeeMyComments = () => {
    const fetchData = () => {
        return wrapPromise(CommentApi.fetchMyComment());
    };

    const [resource, setResource] = useState(fetchData);

    return (
        <div>
            <MyPageCommonTopBar title={'내 댓글'} />
            <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                    <MyComments resource={resource} />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};

const MyComments = ({ resource }) => {

    const dataList = resource.read();

    if(dataList.length == 0){
        return <div>데이터가 없습니다.</div>
    }


    return (
        <div>
            {dataList.map((data, index) => (
                <CommentDetail comment={data} />
            ))}
        </div>
    );
};

const CommentDetail = ({comment})=>{

    const navigate = useNavigate();

    const handlePostClick = async (comid) => {
        navigate(`/community/detail/${comid}`);
    };

    console.log(comment)

    return <div key={comment.id} className="TODO" onClick={() => handlePostClick(comment.community.id)}>
                <div>{comment.content}</div>
                <div>{comment.author.name}</div>
                <div>{comment.community.title}</div>
                <div>{comment.community.id}</div>
            </div>
}

export default SeeMyComments;