import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import commentApi from '../../api/commentApi';
import ContentList from '../HandlerComp/ContentList';
import styles from '../../css/CommentList.module.css';
import CommentDetail from '../CommentComp/CommentDetail';

const CommentList = ({ comid, updateCommentCount }) => {
  const reduxMemberId = useSelector((state) => state.member.member);

  const fetchComments = async (page, pageSize) => {
    const response = await commentApi.fetchComment(comid, page, pageSize);
    updateCommentCount(response.totalCount);
    return response.comments;
  };

  const renderComments = (comment) => (
    <CommentDetail
      key={comment.id}
      comment={comment}
      reduxMemberId={reduxMemberId}
      comid={comid}
      updateCommentCount={updateCommentCount}
    />
  );

  return (
    <div className={styles.commentContainer}>
      <ContentList
        fetchItems={fetchComments}
        renderItem={renderComments}
        fetchParams={[comid]}
      />
    </div>
  );
};

export default CommentList;
