import { useNavigate } from "react-router-dom";


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

export default CommentDetail;