import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import styles from "../../css/mypage_managemypets.module.css";
import copy from "react-copy-to-clipboard/src";
import { TbCopy } from "react-icons/tb";

{/* <CopyToClipboard text={wallet} onCopy={() => alert("클립보드에 복사되었습니다.")}>
	<div className="URL">{wallet}</div>
</CopyToClipboard> */}

const PetCodeModal = ({ onClose, onRegister, modalTitle, type, codeToCopy}) => {
    const [copied, setCopied] = useState();

    const onCopyCode = () => {
        copy(codeToCopy);
    }

    return (
        <>
            <div className={styles.modal_overlay} />
            <div className={styles.container}>
                <div className={styles.titlepart_wrapper}>
                    <div className={styles.modal_title}>{modalTitle}</div>
                    <RxCross2 className={styles.cancel_icon} onClick={onClose} />
                </div>
                <div className={styles.code_box_wrapper}>
                    {type == '코드등록' ? <input className={styles.code_input_box} placeholder="등록할 반려동물의 코드를 입력해주세요"/> 
                    : <div className={styles.code_copy_box}>
                        <div className={styles.code}>{codeToCopy}</div>
                        <TbCopy onClick={onCopyCode} />
                    </div>
                    }
                </div>
                {type == '코드등록' ? <button className={styles.button} onClick={onRegister}>등록</button> : ''}
            </div>
        </>
    )
}

export default PetCodeModal;