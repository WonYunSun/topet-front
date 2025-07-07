import React from 'react';
import styles from '../../css/radioButton.module.css';

const RadioButton = ({ label, value, checked, onChange }) => {
  return (
    <div className={styles.radioButtonContainer}>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.radioButton}
      />
      <label className={styles.radioLabel}>{label}</label>
    </div>
  );
};

export default RadioButton;
