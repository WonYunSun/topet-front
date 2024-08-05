import MyPageCommonTopBar from "../../component/MyPageComp/MyPageCommonTopBar";
import ContentList from "../../component/HandlerComp/ContentList";
import commentApi from "../../api/commentApi";
import { useNavigate } from "react-router-dom";
import styles from "../../css/mypage_seemy.module.css";

const SeeMyComments = () => {
  const fetchComments = (page, pageSize) => {
    return commentApi.fetchMyComment(page, pageSize);
  };

  const renderComment = (comment) => (
    <MyComment key={comment.id} comment={comment} />
  );

  return (
    <div className={styles.wrapper}>
      <MyPageCommonTopBar title={"내 댓글"} />
      <ContentList fetchItems={fetchComments} renderItem={renderComment} />
    </div>
  );
};

const MyComment = ({ comment }) => {
  const navigate = useNavigate();

  const handlePostClick = (comid) => {
    navigate(`/community/detail/${comid}`);
  };

  // 댓글 작성 날짜 표시
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div
      className={styles.comment_container}
      onClick={() => handlePostClick(comment.community.id)}
    >
      <div className={styles.comment_wrapper}>
        <div className={styles.com_title_text}>{comment.community.title}</div>
        <div className={styles.content_text}>{comment.content}</div>
        <div className={styles.date_wrapper}>
          <div className={styles.date_text}>
            {formatDate(comment.createdTime)}
          </div>
          {comment.updatedTime && (
            <div className={styles.edited_text}>수정됨</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeeMyComments;
