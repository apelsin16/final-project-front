import css from './ErrorMessage.module.css';

export const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className={css['error-container']} role="alert">
      <p className={css['error-text']}>Error: {error}</p>
      <button className={css['retry-button']} onClick={onRetry} type="button">
        Retry
      </button>
    </div>
  );
};
