import { FaSpinner } from "react-icons/fa";
import styles from '../../css/communityList.module.css';

function Loading() {
    return  <div className={styles.loading}>
                <FaSpinner className={styles.spinner} />
            </div>;
}

export default Loading;