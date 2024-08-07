import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import commentApi from '../../api/commentApi';
import styles from '../../css/CommentList.module.css';
import { FiMoreVertical } from "react-icons/fi";
import EditDeleteBottomSheet from '../SubBottomSheet';

const CommentList = ({ comid, updateCommentCount }) => {
  const reduxMemberId = useSelector((state) => state.member.member);
  const [comments, setComments] = useState([]);
  const [userProfile, setUserProfile] = useState("https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg");
  const [showSubBottomSheet, setShowSubBottomSheet] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState(null);
  const [currentReplyId, setCurrentReplyId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editReplyId, setEditReplyId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [isCommentWriter, setIsCommentWriter] = useState(false);
  const [isReplyWriter, setIsReplyWriter] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await commentApi.fetchComment(comid);
        console.log(response);
        setComments(response);
        updateCommentCount(calculateTotalComments(response));
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [comid, updateCommentCount]);

  useEffect(() => {
    if (currentCommentId) {
      const comment = comments.find(comment => comment.id === currentCommentId);
      if (comment && comment.author.id === reduxMemberId.id) {
        setIsCommentWriter(true);
      } else {
        setIsCommentWriter(false);
      }
    } else {
      setIsCommentWriter(false);
    }

    if (currentReplyId) {
      const comment = comments.find(comment => comment.children.some(reply => reply.id === currentReplyId));
      const reply = comment?.children.find(reply => reply.id === currentReplyId);
      if (reply && reply.author.id === reduxMemberId.id) {
        setIsReplyWriter(true);
      } else {
        setIsReplyWriter(false);
      }
    } else {
      setIsReplyWriter(false);
    }
  }, [currentCommentId, currentReplyId, comments, reduxMemberId.socialId]);

  const calculateTotalComments = (comments) => {
    let total = comments.length;
    comments.forEach(comment => {
      total += (comment.children ? comment.children.length : 0);
    });
    return total;
  };

  const handleMoreClick = (commentId) => {
    setCurrentCommentId(commentId);
    setCurrentReplyId(null);
    setShowSubBottomSheet(true);
  };

  const handleReplyMoreClick = (replyId) => {
    setCurrentReplyId(replyId);
    setCurrentCommentId(null);
    setShowSubBottomSheet(true);
  };

  const handleReplyClick = (commentId) => {
    setCommentId(commentId);
    setEditCommentId(null);
    setShowSubBottomSheet(false);
    setReplyContent("");
  };

  const handleEditClick = (commentId, content) => {
    setEditCommentId(commentId);
    setCommentId(null);
    setEditReplyId(null);
    setEditContent(content);
    setShowSubBottomSheet(false);
  };

  const handleReplyEditClick = (replyId, content) => {
    setEditReplyId(replyId);
    setEditCommentId(null);
    setCommentId(null);
    setEditContent(content);
    setShowSubBottomSheet(false);
  };

  const handleReplyChange = (content) => {
    setReplyContent(content);
  };

  const handleEditChange = (content) => {
    setEditContent(content);
  };

  const handleReplyPost = async () => {
    if (replyContent.trim() === "") {
      alert("답글 내용을 입력하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("parentId", commentId);
    formData.append("content", replyContent);

    try {
      await commentApi.postReplyComment(comid, formData);
      alert("답글이 등록되었습니다.");
      setReplyContent("");
      setCommentId(null);
      const response = await commentApi.fetchComment(comid);
      setComments(response);
      updateCommentCount(calculateTotalComments(response));
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  const handleEditComment = async () => {
    if (editContent.trim() === "") {
      alert("내용을 입력하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("id", editCommentId);
    formData.append("content", editContent);

    try {
      await commentApi.updateComment(formData);
      alert("댓글이 수정되었습니다.");
      setEditCommentId(null);
      setEditContent("");
      const response = await commentApi.fetchComment(comid);
      setComments(response);
      updateCommentCount(calculateTotalComments(response));
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleEditReply = async () => {
    if (editContent.trim() === "") {
      alert("내용을 입력하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("id", editReplyId);
    formData.append("content", editContent);

    try {
      await commentApi.updateReply(formData);
      alert("답글이 수정되었습니다.");
      setEditReplyId(null);
      setEditContent("");
      const response = await commentApi.fetchComment(comid);
      setComments(response);
      updateCommentCount(calculateTotalComments(response));
    } catch (error) {
      console.error("Error editing reply:", error);
    }
  };

  const handleEditCancel = () => {
    setEditCommentId(null);
    setEditReplyId(null);
    setEditContent("");
    setReplyContent("");
  };

  const handleReplyCancel = () => {
    setCommentId(null);
    setReplyContent("");
  };

  const handleDeleteClick = async (commentId) => {
    try {
      await commentApi.deleteComment(commentId);
      alert("댓글이 삭제되었습니다.");
      setShowSubBottomSheet(false);
      const response = await commentApi.fetchComment(comid);
      setComments(response);
      updateCommentCount(calculateTotalComments(response));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDeleteReplyClick = async (replyId) => {
    try {
      await commentApi.deleteReply(replyId);
      alert("답글이 삭제되었습니다.");
      setShowSubBottomSheet(false);
      const response = await commentApi.fetchComment(comid);
      setComments(response);
      updateCommentCount(calculateTotalComments(response));
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  return (
    <div className={styles.comentContainer}>
      {comments.map((comment) => (
        <div key={`comment-${comment.id}`} className={styles.comentItem}>
          <div className={styles.userProfileContent}>
            <div className={styles.userProfileContainer}>
              <img src={userProfile} alt="User Profile" className={styles.userProfile} />
              <span className={styles.userName}>{comment.author.name}</span>
              <div className={styles.moreIconContainer}>
                <FiMoreVertical className={styles.moreIcon} onClick={() => handleMoreClick(comment.id)} />
              </div>
            </div>
            {editCommentId === comment.id ? (
              <div className={styles.editInputContainer}>
                <input
                  type="text"
                  className={styles.editInput}
                  value={editContent}
                  onChange={(e) => handleEditChange(e.target.value)}
                />
                <button className={styles.cancelButton} onClick={handleEditCancel}>취소</button>
                <button className={styles.submitButton} onClick={handleEditComment}>등록</button>
              </div>
            ) : (
              <div className={styles.comentText}>
                {comment.content}
              </div>
            )}
          </div>
          {commentId === comment.id && (
            <div className={styles.replyInputContainer}>
              <input
                type="text"
                className={styles.replyInput}
                placeholder="답글을 입력하세요"
                value={replyContent}
                onChange={(e) => handleReplyChange(e.target.value)}
              />
              <button className={styles.cancelButton} onClick={handleReplyCancel}>취소</button>
              <button className={styles.replyButton} onClick={handleReplyPost}>등록</button>
            </div>
          )}
          <div className={styles.repliesContainer}>
            {comment.children && comment.children.map((reply) => (
              <div key={`reply-${reply.id}`} className={styles.replyItem}>
                <div className={styles.userProfileContent}>
                  <div className={styles.userProfileContainer}>
                    <img src={userProfile} alt="User Profile" className={styles.userProfile} />
                    <span className={styles.userName}>{reply.author.name}</span>
                    <div className={styles.moreIconContainer}>
                      <FiMoreVertical className={styles.moreIcon} onClick={() => handleReplyMoreClick(reply.id)} />
                    </div>
                  </div>
                  {editReplyId === reply.id ? (
                    <div className={styles.editInputContainer}>
                      <input
                        type="text"
                        className={styles.editInput}
                        value={editContent}
                        onChange={(e) => handleEditChange(e.target.value)}
                      />
                      <button className={styles.cancelButton} onClick={handleEditCancel}>취소</button>
                      <button className={styles.submitButton} onClick={handleEditReply}>등록</button>
                    </div>
                  ) : (
                    <div className={styles.comentText}>
                      {reply.content}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <EditDeleteBottomSheet
        show={showSubBottomSheet}
        onClose={() => setShowSubBottomSheet(false)}
        type={currentReplyId ? "ReplyEditDelete" : (isCommentWriter ? "CommentEditDelete" : "CommentReportBlock")}
        onReplyClick={() => handleReplyClick(currentCommentId)}
        onEditClick={() => currentReplyId ? handleReplyEditClick(currentReplyId, comments.find(comment => comment.children.some(reply => reply.id === currentReplyId)).children.find(reply => reply.id === currentReplyId).content) : handleEditClick(currentCommentId, comments.find(comment => comment.id === currentCommentId).content)}
        onDeleteClick={() => currentReplyId ? handleDeleteReplyClick(currentReplyId) : handleDeleteClick(currentCommentId)}
      />
    </div>
  );
}

export default CommentList;
