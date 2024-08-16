import React, { useState, useEffect } from "react";
import commentApi from "../../api/commentApi";
import CommentDetail from "../CommentComp/CommentDetail";
import ContentList from "../HandlerComp/ContentList";
import { useSelector, useDispatch } from "react-redux";
import EditDeleteBottomSheet from "../SubBottomSheet";
import CheckModal from "../CheckModal";
import { openModal, setReduxModalMessage } from '../../redux/reducers/modalReducer';
import { useNavigate } from 'react-router-dom';

const CommentList = ({ comid, boardType, isshorts }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const reduxMemberId = useSelector((state) => state.member.member.id);
  const reduxmodalOpen = useSelector((state) => state.modal.modalOpen)
  const reduxmodalMessage = useSelector((state) => state.modal.modalMessage)

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
  const [modalIsOpen, setModalIsOpen] = useState(reduxmodalOpen);
  const [modalMessage, setModalMessage] = useState(reduxmodalMessage);
  
  const [checkSubmit, setCheckSubmit] = useState(false);

  useEffect(() => {
    setModalIsOpen(reduxmodalOpen);
    setModalMessage(reduxmodalMessage);
  }, [reduxmodalOpen, reduxmodalMessage]);

  const bottomsheetClose = () => {
    setShowSubBottomSheet(false);
  };

  const modalClose = () => {
    setModalIsOpen(false);
    dispatch(openModal(false));
    dispatch(setReduxModalMessage(""));

  }

  const activateReplyInput = (commentId) => {
    bottomsheetClose();
    setActiveReplyInput(commentId);
  };

  const handleDeleteComment = async () => {
    if (checkSubmit) return;
    setCheckSubmit(true);

    try {
      await commentApi.deleteComment(commentId);
      setShowSubBottomSheet(false);
      setModalMessage("댓글이 삭제되었습니다.");
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error deleting comment:", error);
      setModalMessage("댓글 삭제에 실패했습니다.");
      setModalIsOpen(true);
    } finally {
      setCheckSubmit(false);
    }
  };

  const handleDeleteReply = async () => {
    if (checkSubmit) return;
    setCheckSubmit(true);

    try {
      await commentApi.deleteReply(replyId);
      setShowSubBottomSheet(false);
      setModalMessage("답글이 삭제되었습니다.");
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error deleting reply:", error);
      setModalMessage("답글 삭제에 실패했습니다.");
      setModalIsOpen(true);
    } finally {
      setCheckSubmit(false);
    }
  };

  const handleEditComment = (id) => {
    setIsEditingComment(id);
    setShowSubBottomSheet(false);
  };

  const handleEditReply = (id) => {
    setIsEditingReply(id);
    setShowSubBottomSheet(false);
  };

  const handleEditSubmit = async (id, content, isComment) => {
    if (checkSubmit || !content || content.trim() === "") return;
    setCheckSubmit(true);

    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("content", content);

      if (isComment) {
        await commentApi.updateComment(formData);
        setIsEditingComment(null);
        setModalMessage("댓글이 수정되었습니다.");
      } else {
        await commentApi.updateReply(formData);
        setIsEditingReply(null);
        setModalMessage("답글이 수정되었습니다.");
      }
      setFetchKey((prevKey) => prevKey + 1);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error updating content:", error);
      setModalMessage("수정에 실패했습니다.");
      setModalIsOpen(true);
    } finally {
      setCheckSubmit(false);
    }
  };

  const handleReplySubmit = async (parentCommentId, replyContent) => {
    if (checkSubmit || !replyContent || replyContent.trim() === "") return;
    setCheckSubmit(true);

    if (parentCommentId && replyContent && replyContent.trim()) {
      try {
        const formData = new FormData();
        formData.append("parentId", parentCommentId);
        formData.append("content", replyContent);
        formData.append("author", reduxMemberId);

        await commentApi.postReplyComment(comid, formData);
        setActiveReplyInput(null);
    
        // setFetchKey((prevKey) => prevKey + 1);
        setModalMessage("답글이 등록되었습니다.");
        setModalIsOpen(true);
      } catch (error) {
        console.error("Error posting reply:", error);
        setModalMessage("답글 등록에 실패했습니다.");
        setModalIsOpen(true);
      } finally {
        setCheckSubmit(false);
      }
    }
  };

  const handleEditCancel = () => {
    setIsEditingComment(null);
    setIsEditingReply(null);
  };

  const determineType = () => {
    if (commentId && isCommentWriter) {
      return {
        type: "CommentEditDelete",
        deleteHandler: handleDeleteComment,
        editHandler: () => handleEditComment(commentId),
      };
    } else if (commentId) {
      return { type: "CommentReportBlock", deleteHandler: null };
    } else if (replyId && isReplyWriter) {
      return {
        type: "ReplyEditDelete",
        deleteHandler: handleDeleteReply,
        editHandler: () => handleEditReply(replyId),
      };
    } else {
      return { type: "ReplyReportBlock", deleteHandler: null };
    }
  };

  const fetchComments = async (page, pageSize) => {
    try {
      return await commentApi.fetchComment(comid, page, pageSize, boardType);
    } catch (error) {
      console.error("댓글을 불러오는 중 오류 발생:", error);
    }
  };

  const renderComments = (comment) => (
    <CommentDetail
      isshorts={isshorts}
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
      {modalIsOpen && (
        <CheckModal
          Content={modalMessage}
          onClose={modalClose}
          oneBtn={true}
        />
      )}
    </div>
  );
};

export default CommentList;
