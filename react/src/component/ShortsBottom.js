import React, { useRef, useState, useEffect } from "react";
import styles from "../css/subBottomSheet.module.css";
import CommentCreate from "./CommentComp/CommentCreate";
import CommentList from "./CommentComp/CommentList";
import { CgClose } from "react-icons/cg";
/// responsive
import { Mobile, DeskTop } from "../responsive/responsive";
import { useMediaQuery } from "react-responsive";

const ShortsBottom = ({ onClose, id, show, isshorts }) => {
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [commentListKey, setCommentListKey] = useState(0); // key 상태 추가

  const handleCommentSubmit = () => {
    setCommentListKey((prevKey) => prevKey + 1); // key 값을 증가시켜 CommentList를 리렌더링
  };

  useEffect(() => {
    // id 값이 변경될 때마다 commentListKey를 증가시켜 CommentList를 리렌더링
    setCommentListKey((prevKey) => prevKey + 1);
  }, [id]);

  return (
    <>
      {show && !isshorts && (
        <div className={styles.overlay} onClick={onClose}></div>
      )}
      <div
        className={`${styles.bottomSheet} ${show ? styles.show : ""} ${
          isDeskTop && !isshorts ? styles.dtver : ""
        } ${isshorts ? styles.shortsBtm : ""}`}
      >
        <div className={styles.bottomSheetTitle}>
          댓글
          <CgClose
            color="#444"
            size={20}
            className={styles.closeIcon}
            onClick={onClose}
          />
        </div>
        <div className={styles.bottomSheetContent}>
          <Mobile>
            <CommentCreate
              type={"shorts"}
              comid={id}
              onCommentSubmit={handleCommentSubmit}
            />
            <CommentList key={commentListKey} comid={id} boardType={"shorts"} />
          </Mobile>
          <DeskTop>
            <div className={styles.dt_CommWrap}>
              <div>
                <CommentList
                  isshorts={true}
                  key={commentListKey}
                  comid={id}
                  boardType={"shorts"}
                />
              </div>
              <div>
                <CommentCreate
                  type={"shorts"}
                  comid={id}
                  onCommentSubmit={handleCommentSubmit}
                />
              </div>
            </div>
          </DeskTop>
        </div>
      </div>
    </>
  );
};

export default ShortsBottom;
