import React, { useRef, useState , useEffect } from "react";
import styles from "../css/subBottomSheet.module.css";
import CommentCreate from "./CommentComp/CommentCreate";
import CommentList from "./CommentComp/CommentList";

const ShortsBottom = ({id}) => {
    const [commentListKey, setCommentListKey] = useState(0); // key 상태 추가
    const show = true;

    const handleCommentSubmit = () => {
        setCommentListKey((prevKey) => prevKey + 1); // key 값을 증가시켜 CommentList를 리렌더링
    };

  return (  
    <div className={styles.overlay}>
        <div className={`${styles.bottomSheet} ${show ? styles.show : ""}` }>
            <div className={styles.bottomSheetTitle}>댓글</div>
            <div className={styles.bottomSheetContent}>
            <CommentList key={commentListKey} comid={id} boardType={"shortsl"}/>
            <CommentCreate type={"shorts"} comid={id} onCommentSubmit={handleCommentSubmit} />
            </div>
        </div>
    </div>
  );
};

export default ShortsBottom;
