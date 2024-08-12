import React, { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import styles from "../../css/comment_detail.module.css";

const CommentDetail = ({ 
  comment, 
  reduxMemberId, 
  setIsCommentWriter, 
  setIsReplyWriter, 
  setCommentId,
  setReplyId,     
  setShowSubBottomSheet,
  activeReplyInput,
  setActiveReplyInput,
  replyId,
  isEditingComment,
  isEditingReply,
  handleEditSubmit,
  handleEditCancel,
  handleReplySubmit 
}) => {
  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState("");  // 수정 중인 내용을 관리

  const src = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEyMDZfNTYg%2FMDAxNzAxODQ1MDQ3OTEy.3nTCEkxraOwSwPN3iGXsityOqeGL37xSYSwzlNpvtN0g.1uI0TfuUpdgH463RXWgf98KONJHKbyncpRmIKE0W9Rgg.JPEG.ddogddogcafe%2F267.jpg&type=sc960_832";
  
  // 수정 모드가 활성화될 때 기존 내용을 editContent에 설정
  useEffect(() => {
    if (isEditingComment === comment.id) {
      setEditContent(comment.content);
    } else if (isEditingReply === replyId) {
      const replyToEdit = comment.children.find(reply => reply.id === isEditingReply);
      if (replyToEdit) {
        setEditContent(replyToEdit.content);
      }
    }
  }, [isEditingComment, isEditingReply, comment, replyId]);

  const handleCommentMoreClick = () => {
    if (reduxMemberId === comment.author.id) {
      setIsCommentWriter(true);
    } else {
      setIsCommentWriter(false);
    }
    setCommentId(comment.id);
    setReplyId(null);
    setShowSubBottomSheet(true);
  };

  const handleReplyMoreClick = (reply) => {
    if (reduxMemberId === reply.author.id) {
      setIsReplyWriter(true);
    } else {
      setIsReplyWriter(false);
    }
    setReplyId(reply.id);
    setCommentId(null);
    setShowSubBottomSheet(true);
  };

  const writeReplyCancel = () => {
    setActiveReplyInput(null);
    setReplyContent("");
  };

  const isReplyInputActive = activeReplyInput === comment.id;

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        <div className={styles.authorInfo}>
          <img 
            src={src} 
            alt="User Profile" 
            className={styles.profileImage} 
          />
          <div className={styles.authorName}>{comment.author.name}</div>
        </div>
        <FiMoreVertical 
          className={styles.moreIcon} 
          onClick={handleCommentMoreClick} 
        />
      </div>

      {isEditingComment === comment.id ? (
        <div>
          <input 
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className={styles.editInput}
          />
          <button onClick={handleEditCancel}>취소</button>
          <button onClick={() => handleEditSubmit(comment.id, editContent, true)}>등록</button>
        </div>
      ) : (
        <div className={styles.commentContent}>
          {comment.content}
        </div>
      )}

      {isReplyInputActive && (
        <div>
          <input 
            placeholder="답글을 입력하세요."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <button onClick={writeReplyCancel}>취소</button>
          <button onClick={() => handleReplySubmit(comment.id, replyContent)}>등록</button>
        </div>
      )}

      <div className={styles.replyContainer}>
        {comment.children && comment.children.map((reply) => (
          <div key={reply.id} className={styles.replyItem}>
            <div className={styles.commentHeader}>
              <div className={styles.authorInfo}>
                <img 
                  src={src} 
                  alt="User Profile" 
                  className={styles.profileImage} 
                />
                <div className={styles.authorName}>{reply.author.name}</div>
              </div>
              <FiMoreVertical 
                className={styles.moreIcon}
                onClick={() => handleReplyMoreClick(reply)}
              />
            </div>
            {isEditingReply === reply.id ? (
              <div>
                <input 
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className={styles.editInput}
                />
                <button onClick={handleEditCancel}>취소</button>
                <button onClick={() => handleEditSubmit(reply.id, editContent, false)}>등록</button>
              </div>
            ) : (
              <div className={styles.commentContent}>
                {reply.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentDetail;
