import MyPageCommonTopBar from '../../component/MyPageComp/MyPageCommonTopBar';
import ContentList from '../../component/HandlerComp/ContentList';
import commentApi from '../../api/commentApi';
import CommentDetail from '../../component/CommentComp/CommentDetail';


const SeeMyComments = () => {

    const fetchComments = (page, pageSize) => {
        return commentApi.fetchMyComment(page, pageSize);
    };

    const renderComment = (comment) => (
        <CommentDetail key={comment.id} comment={comment} />
    );

    return (
        <div>
            <MyPageCommonTopBar title={'내 댓글'} />
            <ContentList fetchItems={fetchComments} renderItem={renderComment}
            />
        </div>
    );
};



export default SeeMyComments;
