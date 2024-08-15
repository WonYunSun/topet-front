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
  handleReplySubmit,
  setCommentAuthorId,
  setreplyAuthorId,
  isshorts,
}) => {
  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState("");

  //임시 유저 프로필 주소
  const src =
    "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEyMDZfNTYg%2FMDAxNzAxODQ1MDQ3OTEy.3nTCEkxraOwSwPN3iGXsityOqeGL37xSYSwzlNpvtN0g.1uI0TfuUpdgH463RXWgf98KONJHKbyncpRmIKE0W9Rgg.JPEG.ddogddogcafe%2F267.jpg&type=sc960_832";

  useEffect(() => {
    // 수정 모드가 활성화될 때 기존 내용을 editContent에 설정
    if (isEditingComment === comment.id) {
      setEditContent(comment.content);
    } else if (isEditingReply === replyId) {
      const replyToEdit = comment.children.find(
        (reply) => reply.id === isEditingReply
      );
      if (replyToEdit) {
        setEditContent(replyToEdit.content);
      }
    }
  }, [isEditingComment, isEditingReply, comment, replyId]);

  const handleCommentMoreClick = () => {
    // 댓글 더보기 버튼 클릭
    if (reduxMemberId === comment.author.id) {
      setIsCommentWriter(true);
    } else {
      setIsCommentWriter(false);
    }
    setCommentId(comment.id);
    setCommentAuthorId(comment.author.id);
    setreplyAuthorId(null);
    setReplyId(null);
    setShowSubBottomSheet(true);
  };

  const handleReplyMoreClick = (reply) => {
    // 답글 더보기 버튼 클릭
    if (reduxMemberId === reply.author.id) {
      setIsReplyWriter(true);
    } else {
      setIsReplyWriter(false);
    }
    setReplyId(reply.id);
    setreplyAuthorId(reply.author.id);
    setCommentAuthorId(null);
    setCommentId(null);
    setShowSubBottomSheet(true);
  };

  const writeReplyCancel = () => {
    // 답글 작성 취소
    setActiveReplyInput(null);
    setReplyContent("");
  };
  console.log(isshorts);
  const isReplyInputActive = activeReplyInput === comment.id;

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        <div className={styles.authorInfo}>
          <img src={src} alt="User Profile" className={styles.profileImage} />
          <div className={styles.authorName}>{comment.author.name}</div>
        </div>
        <FiMoreVertical
          className={styles.moreIcon}
          onClick={handleCommentMoreClick}
        />
      </div>

      {isEditingComment === comment.id ? (
        <div
          className={`${styles.replyInputWrap} ${
            isshorts ? styles.shortsReply : ""
          }`}
        >
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className={styles.inputBox}
          />
          <button onClick={handleEditCancel}>취소</button>
          <button
            onClick={() => handleEditSubmit(comment.id, editContent, true)}
          >
            등록
          </button>
        </div>
      ) : (
        <div className={styles.commentContent}>{comment.content}</div>
      )}

      {isReplyInputActive && (
        <div
          className={`${styles.replyInputWrap} ${
            isshorts ? styles.shortsReply : ""
          }`}
        >
          <input
            placeholder="답글을 남겨보세요"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className={styles.inputBox}
          />
          <button onClick={writeReplyCancel}>취소</button>
          <button onClick={() => handleReplySubmit(comment.id, replyContent)}>
            등록
          </button>
        </div>
      )}

      <div className={styles.replyContainer}>
        {comment.children &&
          comment.children.map((reply) => (
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
                <div
                  className={`${styles.replyInputWrap} ${
                    isshorts ? styles.shortsReply : ""
                  }`}
                >
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className={styles.inputBox}
                  />
                  <button onClick={handleEditCancel}>취소</button>
                  <button
                    onClick={() =>
                      handleEditSubmit(reply.id, editContent, false)
                    }
                  >
                    등록
                  </button>
                </div>
              ) : (
                <div className={styles.commentContent}>{reply.content}</div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentDetail;
