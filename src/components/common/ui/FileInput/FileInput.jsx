import { useState, useRef } from 'react';
import styles from './FileInput.module.css'; // імпорт CSS-модулю, якщо потрібен

const FileInput = ({
  name,
  label,
  onChange,
  error,
  required = false,
}) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);

const handleFileChange = (e) => {
  const file = e.target.files && e.target.files[0];
  if (file) {
    setPreviewUrl(URL.createObjectURL(file));
    setFileName(file.name);
    onChange(file); // <-- передаємо FILE
  }
};

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setFileName(file.name);
      onChange(file);
    }
  };

  const handleClear = () => {
    setPreviewUrl(null);
    setFileName('');
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && ' *'}
        </label>
      )}

      <div
        className={styles.dropzone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current?.click()}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className={styles.previewImage}
          />
        ) : (
          <div className={styles.placeholder}>
            <svg width={50} height={50}>
              <use href="/src/assets/sprite.svg#photo" />
            </svg>
            <p>Upload a photo</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        onChange={handleFileChange}
        required={required}
        style={{ display: 'none' }}
      />

      {previewUrl && (
        <p
          role="button"
          tabIndex={0}
          onClick={handleClear}
          onKeyDown={e => e.key === 'Enter' && handleClear()}
          className={styles.clearButton}
        >
          Upload another photo
        </p>
      )}

      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default FileInput;
