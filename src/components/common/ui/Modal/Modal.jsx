import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import IconButton from '../IconButton/IconButton';
import clsx from 'clsx';

/**
 * Универсальный компонент модального окна
 * Отображает контент в модальном окне с кнопкой закрытия
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Открыто ли модальное окно
 * @param {function} props.onClose - Функция закрытия модального окна
 * @param {ReactNode} props.children - Контент модального окна
 * @param {string} props.className - Дополнительные CSS классы для контейнера
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

    // Закрытие по клавише Escape
    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // Блокируем скролл страницы когда модальное окно открыто
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    // Закрытие по клику на backdrop
    const handleBackdropClick = event => {
        if (event.target === backdropRef.current) {
            onClose();
        }
    };

    // Если модальное окно закрыто, не рендерим ничего
    if (!isOpen) {
        return null;
    }

    const modalClasses = clsx(styles.modal, className);

    return createPortal(
        <div className={styles.backdrop} ref={backdropRef} onClick={handleBackdropClick}>
            <div className={modalClasses} ref={modalRef}>
                {/* Кнопка закрытия */}
                <div className={styles.closeButton}>
                    <IconButton icon='close' onClick={onClose} aria-label='Close modal' />
                </div>

                {/* Контент модального окна */}
                <div className={styles.content}>{children}</div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
