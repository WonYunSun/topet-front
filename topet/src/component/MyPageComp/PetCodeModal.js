import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import styles from "../../css/mypage_managemypets.module.css";
import { TbCopy } from "react-icons/tb";
import { CopyToClipboard } from "react-copy-to-clipboard/src";

{
  /* <CopyToClipboard text={wallet} onCopy={() => alert("클립보드에 복사되었습니다.")}>
	<div className="URL">{wallet}</div>
</CopyToClipboard> */
}

const PetCodeModal = ({
  setPetCode,
  setCopied,
  onClose,
  onRegister,
  modalTitle,
  type,
  codeToCopy,
  uid,
  idx,
}) => {
  const onCopyCode = (text) => {
    setCopied(true);
    console.log("복사성공! : ", text);
    onClose();
    setTimeout(() => setCopied(false), 1800);
  };

  const handleInputPetCode = (e) => {
    const tempPetCode = e.target.value;
    setPetCode(tempPetCode);
  };

  return (
    <>
      <div className={styles.modal_overlay} />
      <div
        className={`${
          type == "코드등록"
            ? styles.input_code_container
            : styles.copy_code_container
        }`}
      >
        <div className={styles.titlepart_wrapper}>
          <div className={styles.modal_title}>{modalTitle}</div>
          <RxCross2 className={styles.cancel_icon} onClick={()=>onClose} />
        </div>
        <div className={styles.code_box_wrapper}>
          {type == "코드등록" ? (
            <input
              onChange={handleInputPetCode}
              className={styles.code_input_box}
              placeholder="코드를 입력해주세요"
            />
          ) : (
            <div className={styles.code_copy_box}>
              <div className={styles.code}>{uid}</div>
              <CopyToClipboard text={codeToCopy} onCopy={onCopyCode}>
                <TbCopy className={styles.copy_icon} onClick={() => {}} />
              </CopyToClipboard>
            </div>
          )}
        </div>
        {type == "코드등록" ? (
          <button className={styles.button} onClick={()=>onRegister}>
            등록
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default PetCodeModal;
