import { FaSpinner } from "react-icons/fa";
import styles from "../../css/communityList.module.css";

export function Loading() {
  return (
    <div className={styles.loading}>
      <FaSpinner className={styles.spinner} />
    </div>
  );
}

export function LoadError() {
  return (
    <div className={styles.error_message}>
      데이터를 불러오는 중 오류가 발생했습니다
      <br />
      다시 시도 해주세요.
    </div>
  );
}

export function NoContent() {
  return <div className={styles.error_message}>데이터가 없습니다.</div>;
}
  