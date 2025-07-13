import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import IconButton from '../IconButton/IconButton';
import clsx from 'clsx';

/**
 * Універсальний компонент модального вікна
 * Відображає контент у модальному вікні з кнопкою закриття
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Чи відкрите модальне вікно
 * @param {function} props.onClose - Функція закриття модального вікна
 * @param {ReactNode} props.children - Контент модального вікна
 * @param {string} props.className - Додаткові CSS класи для контейнера
 *
 * @example
 * <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
 *   <h2>Modal Title</h2>
 *   <p>Modal content goes here</p>
 * </Modal>
 */
const Modal = ({ isOpen, onClose, children, className }) => {
    const modalRef = useRef(null);
    const backdropRef = useRef(null);

    // Закриття за клавішею Escape
    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // Блокуємо скрол сторінки коли модальне вікно відкрите
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    // Закриття за кліком на backdrop
    const handleBackdropClick = event => {
        if (event.target === backdropRef.current) {
            onClose();
        }
    };

    // Якщо модальне вікно закрите, не рендеримо нічого
    if (!isOpen) {
        return null;
    }

    const modalClasses = clsx(styles.modal, className);

    return createPortal(
        <div className={styles.backdrop} ref={backdropRef} onClick={handleBackdropClick}>
            <div className={modalClasses} ref={modalRef}>
                {/* Кнопка закриття */}
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label='Close modal'
                    type='button'>
                    <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <line x1='18' y1='6' x2='6' y2='18' />
                        <line x1='6' y1='6' x2='18' y2='18' />
                    </svg>
                </button>

                {/* Контент модального вікна */}
                <div className={styles.content}>{children}</div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
