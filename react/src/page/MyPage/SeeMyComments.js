import React, { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';
import MyPageCommonTopBar from '../../component/MyPageComp/MyPageCommonTopBar';
import CommentApi from "../../api/commentApi";
import { useNavigate } from "react-router-dom";
import { LoadError, Loading, NoContent } from "../../component/HandlerComp/compHandler";

const PAGE_SIZE = 20;

const SeeMyComments = () => {
    const [resources, setResources] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const loadMoreComments = async () => {
        if (!hasMore || loading) {
            return;
        }
        try {
            const newResource = await CommentApi.fetchMyComment(page, PAGE_SIZE);
            if (newResource.length === 0) {
                setHasMore(false);
            }
            setResources(prev => [...prev, ...newResource]);
            setPage(prev => prev + 1);
        } catch (err) {
            setHasError(true);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(false);
        loadMoreComments();
    }, []);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView && hasMore) {
            loadMoreComments();
        }
    }, [inView, hasMore]);

    return (
        <div>
            <MyPageCommonTopBar title={'내 댓글'} />
            {resources.map((comment, index) => (
                <CommentDetail key={comment.id} comment={comment} />
            ))}
            {!loading && hasMore &&
                <div ref={ref}>
                    <Loading />
                </div>
            }
            {!loading && hasError && 
                <LoadError />
            }
            {!loading && !hasError && !hasMore && resources.length === 0 &&
                <NoContent />
            }
        </div>
    );
};

const CommentDetail = ({ comment }) => {
    const navigate = useNavigate();

    const handlePostClick = (comid) => {
        navigate(`/community/detail/${comid}`);
    };

    return (
        <div className="TODO" onClick={() => handlePostClick(comment.community.id)} style={{ height: '150px', margin: '10px 0' }}>
            <div>{comment.content}</div>
            <div>{comment.id}</div>
            <div>{comment.author.name}</div>
            <div>{comment.community.title}</div>
            <div>{comment.community.id}</div>
        </div>
    );
}

export default SeeMyComments;
