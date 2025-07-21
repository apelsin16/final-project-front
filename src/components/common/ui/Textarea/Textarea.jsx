import { useRef, useEffect } from 'react';
import styles from './Textarea.module.css';
import clsx from 'clsx';

const Textarea = ({
    value,
    onChange,
    placeholder,
    label,
    name,
    id,
    required = false,
    disabled = false,
    error,
    maxLength = 200,
    className,
}) => {
    const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className={clsx(styles.wrapper, className)}>
            {label && (
                <label htmlFor={inputId} className={styles.label}>
                    {label}
                </label>
            )}

            <textarea
                id={inputId}
                name={name}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                maxLength={maxLength}
                disabled={disabled}
                className={clsx(styles.textarea, {
                    [styles.error]: error,
                    [styles.disabled]: disabled,
                })}
            />

            <div className={styles.footer}>
                <span className={styles.counter}>{value?.length || 0}</span>/
                <span className={styles.max}>{maxLength}</span>
                {error && <span className={styles.errorMessage}>{error}</span>}
            </div>
        </div>
    );
};

export default Textarea;
