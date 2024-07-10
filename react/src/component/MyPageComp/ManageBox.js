import React from "react";

const ManageBox = (pageRoute, icon, managementItemTitle) => {
    return (
        <div onClick={pageRoute}>
            {icon}
            {managementItemTitle}
        </div>
    );
}

export default ManageBox;