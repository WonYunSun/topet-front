import React, { useState } from 'react';
import commentApi from '../../api/commentApi';
import CommentDetail from '../CommentComp/CommentDetail';
import ContentList from '../HandlerComp/ContentList';
import { useSelector } from 'react-redux';
import EditDeleteBottomSheet from '../SubBottomSheet';

const CommentList = ({ 
  comid, 
  setShowModal, 
  setModalText, 
}) => {
  const reduxMemberId = useSelector((state) => state.member.member.id);

  const [isCommentWriter, setIsCommentWriter] = useState(false);
  const [isReplyWriter, setIsReplyWriter] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [replyId, setReplyId] = useState(null);
  const [showSubBottomSheet, setShowSubBottomSheet] = useState(false);
  const [activeReplyInput, setActiveReplyInput] = useState(false);
  const [fetchKey, setFetchKey] = useState(0);
  const [isEditingComment, setIsEditingComment] = useState(null);
  const [isEditingReply, setIsEditingReply] = useState(null);
  const [commentAuthorId, setCommentAuthorId] = useState(null);
  const [replyAuthorId, setreplyAuthorId] = useState(null);

  const bottomsheetClose = () => {
    //바텀시트 닫기
    setShowSubBottomSheet(false);
  };

  const activateReplyInput = (commentId) => {
    // 답글 달기 박스 활성화
    bottomsheetClose();
    setActiveReplyInput(commentId);
  };

  const handleDeleteComment = async () => {
    // 댓글 삭제
    await commentApi.deleteComment(commentId);
    setShowSubBottomSheet(false);
    setFetchKey(prevKey => prevKey + 1);
    setModalText("댓글이 삭제 되었습니다.");
    setShowModal(true);
  };

  const handleDeleteReply = async () => {
    // 답글 삭제
    await commentApi.deleteReply(replyId);
    setShowSubBottomSheet(false);
    setFetchKey(prevKey => prevKey + 1);
    setModalText("답글이 삭제 되었습니다.");
    setShowModal(true);
  };

  const handleEditComment = (id) => {
    // 댓글 수정
    setIsEditingComment(id);
    setShowSubBottomSheet(false);
  };

  const handleEditReply = (id) => {
    // 답글 수정
    setIsEditingReply(id);
    setShowSubBottomSheet(false);
  };


  const handleEditSubmit = async (id, content, isComment) => {
    // 댓글 수정 후 등록
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("content", content);

      if (isComment) {
        await commentApi.updateComment(formData);
        setIsEditingComment(null);
      } else {
        await commentApi.updateReply(formData);
        setIsEditingReply(null);
      }
      setFetchKey(prevKey => prevKey + 1);
      setModalText("댓글이 수정 되었습니다.");
      setShowModal(true);
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const handleReplySubmit = async (parentCommentId, replyContent) => {
    // 답글 수정 후 등록
    if (parentCommentId && replyContent && replyContent.trim()) {
      try {
        const formData = new FormData();
        formData.append("parentId", parentCommentId);
        formData.append("content", replyContent);
        
        await commentApi.postReplyComment(comid, formData);
        setActiveReplyInput(null);  // 답글 입력란을 닫음
        setFetchKey(prevKey => prevKey + 1);
        setModalText("답글이 수정 되었습니다.");
        setShowModal(true);
      } catch (error) {
        console.error("Error posting reply:", error);
      }
    }
  };

  const handleEditCancel = () => {
    // 댓글, 답글 수정 취소
    setIsEditingComment(null);
    setIsEditingReply(null);
  };

  const determineType = () => {
    // 바텀시트 케이스 분류
    if (commentId && isCommentWriter) {
      return { type: "CommentEditDelete", deleteHandler: handleDeleteComment, editHandler: () => handleEditComment(commentId) };
    } else if (commentId) {
      return { type: "CommentReportBlock", deleteHandler: null };
    } else if (replyId && isReplyWriter) {
      return { type: "ReplyEditDelete", deleteHandler: handleDeleteReply, editHandler: () => handleEditReply(replyId) };
    } else {
      return { type: "ReplyReportBlock", deleteHandler: null };
    }
  };

  //

  const fetchComments = async (page, pageSize) => {
    try {
      return await commentApi.fetchComment(comid, page, pageSize);
    } catch (error) {
      console.error("댓글을 불러오는 중 오류 발생:", error);
    }
  };

  const renderComments = (comment) => {
    return (
      <CommentDetail
        key={comment.id}
        comment={comment}
        reduxMemberId={reduxMemberId}
        activeReplyInput={activeReplyInput}
        replyId={replyId}
        setActiveReplyInput={setActiveReplyInput}
        setIsCommentWriter={setIsCommentWriter}
        setIsReplyWriter={setIsReplyWriter}
        setCommentId={setCommentId}
        setReplyId={setReplyId}
        setShowSubBottomSheet={setShowSubBottomSheet}
        isEditingComment={isEditingComment}
        isEditingReply={isEditingReply}
        handleEditSubmit={handleEditSubmit}
        handleEditCancel={handleEditCancel}
        handleReplySubmit={handleReplySubmit}
        setCommentAuthorId={setCommentAuthorId}
        setreplyAuthorId={setreplyAuthorId}
      />
    );
  };

  console.log("댓글 쓴 사람",commentAuthorId)
  console.log("답글 쓴 사람",replyAuthorId)

  return (
    <div>
      <ContentList 
        key={fetchKey}
        fetchItems={fetchComments} 
        renderItem={renderComments} 
      />
      {showSubBottomSheet && (
        <EditDeleteBottomSheet
          show={showSubBottomSheet}
          onClose={bottomsheetClose}
          type={determineType().type}
          genre={"댓글"}
          onReplyClick={() => activateReplyInput(commentId)}
          onDeleteClick={determineType().deleteHandler}
          onEditClick={determineType().editHandler}
          commentId={commentId}
          replyId={replyId}
          reduxMemberId={reduxMemberId}
          commentAuthorId={commentAuthorId}
          replyAuthorId={replyAuthorId}
        />
      )}
    </div>
  );
}

export default CommentList;
