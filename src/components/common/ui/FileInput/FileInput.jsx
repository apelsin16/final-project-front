import { useState, useRef } from 'react';

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
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setFileName(file.name);
      onChange(file); // передаємо файл у форму
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
    <div >
      {label && (
        <label>
          {label}
        </label>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
           width: '343px',
          height: '318px',
          border: '1px dashed #BFBEBE',
          borderRadius: '30px',
          textAlign: 'center',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FAFAFA',
          overflow: 'hidden',
        }}
        onClick={() => inputRef.current?.click()}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            style={{  
              maxWidth: '120%',
              maxHeight: '120%',
              objectFit: 'cover',
              borderRadius: '20px', }}
          />
        ) : (
            <div>
                <svg width={50} height={50}>
                    <use href={"/src/assets/sprite.svg#photo"} />
                </svg>
                <p>Upload a photo</p>
            </div> 
        )}
      </div>

      {/* {fileName && <div style={{ marginBottom: '8px' }}>{fileName}</div>} */}

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
        <p type="button" onClick={handleClear} style={{ border: "none", background: "none", textDecoration: "underline", textAlign: "center" }}>
          Upload another photo
        </p>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default FileInput;
