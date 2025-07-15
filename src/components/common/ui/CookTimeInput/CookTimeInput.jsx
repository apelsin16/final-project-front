import { useEffect, useState } from 'react';
import styles from './CookTimeInput.module.css';
import clsx from 'clsx';

const allowedValues = [10, 20, 40, 60];

const CookTimeInput = ({ value, onChange, error, label = 'cOOKING TIME' }) => {
  const initialIndex = allowedValues.indexOf(Number(value)) !== -1
    ? allowedValues.indexOf(Number(value))
    : 0;

  const [index, setIndex] = useState(initialIndex);

  const handleDecrease = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleIncrease = () => {
    if (index < allowedValues.length - 1) setIndex(index + 1);
  };

  useEffect(() => {
    onChange(allowedValues[index]);
  }, [index, onChange]);

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.controls}>
        <button type="button" onClick={handleDecrease} className={styles.btn}>−</button>
        <span className={clsx(styles.value, error && styles.errorValue)}>
          {allowedValues[index]} min
        </span>
        <button type="button" onClick={handleIncrease} className={styles.btn}>+</button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default CookTimeInput;
