import React from "react";
import styles from "../../css/mypage_managebox.module.css";

const ManageBox = ({ pageRoute, icon, managementItemTitle }) => {
    return (
        <div className={styles.managebox_wrapper} // onClick={pageRoute}
        >
            <div className={styles.icon}>{icon}</div>
            <div className={styles.management_item_title}>{managementItemTitle}</div>
        </div>
    );
}

export default ManageBox;