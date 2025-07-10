import { useState, useRef, useEffect } from 'react';
import styles from './Select.module.css';
import clsx from 'clsx';

/**
 * Компонент выпадающего списка (Select)
 *
 * @param {Object} props
 * @param {Array} props.options - Массив опций [{value, label}]
 * @param {string|number} props.value - Выбранное значение
 * @param {function} props.onChange - Обработчик изменения значения
 * @param {string} props.placeholder - Текст плейсхолдера
 * @param {string} props.label - Текст лейбла
 * @param {'small' | 'large'} props.size - Размер селекта (48px | 56px)
 * @param {boolean} props.required - Обязательно ли поле
 * @param {boolean} props.disabled - Выключен ли селект
 * @param {string} props.error - Текст ошибки
 * @param {string} props.className - Дополнительные CSS классы
 * @param {string} props.name - Имя поля
 * @param {string} props.id - ID поля
 *
 * @example
 * // Селект категорий
 * <Select
 *   options={[
 *     {value: 'beef', label: 'Beef'},
 *     {value: 'chicken', label: 'Chicken'}
 *   ]}
 *   value={category}
 *   onChange={setCategory}
 *   placeholder="Select a category"
 *   label="CATEGORY"
 *   size="large"
 * />
 */
const Select = ({
    options = [],
    value,
    onChange,
    placeholder = 'Select an option',
    label,
    size = 'large',
    required = false,
    disabled = false,
    error,
    className,
    name,
    id,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);
    const dropdownRef = useRef(null);

    const selectId = id || name || label?.toLowerCase().replace(/\s+/g, '-');

    // Закрытие при клике вне компонента
    useEffect(() => {
        const handleClickOutside = event => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Закрытие при нажатии Escape
    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen]);

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleOptionClick = optionValue => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const selectedOption = options.find(option => option.value === value);
    const displayText = selectedOption ? selectedOption.label : placeholder;

    const selectClasses = clsx(
        styles.select,
        styles[size],
        {
            [styles.error]: error,
            [styles.disabled]: disabled,
            [styles.open]: isOpen,
            [styles.hasValue]: !!selectedOption,
        },
        className
    );

    const wrapperClasses = clsx(styles.wrapper, {
        [styles.hasError]: error,
    });

    return (
        <div className={wrapperClasses} ref={selectRef}>
            {label && (
                <label htmlFor={selectId} className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}

            <div className={styles.selectWrapper}>
                <div
                    className={selectClasses}
                    onClick={toggleDropdown}
                    role='combobox'
                    aria-expanded={isOpen}
                    aria-haspopup='listbox'
                    tabIndex={disabled ? -1 : 0}
                    onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleDropdown();
                        }
                    }}>
                    <span className={styles.selectText}>{displayText}</span>

                    <div className={clsx(styles.arrow, { [styles.rotated]: isOpen })}>
                        <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                            <path
                                d='M5 7.5L10 12.5L15 7.5'
                                stroke='currentColor'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </div>
                </div>

                {isOpen && (
                    <div className={styles.dropdown} ref={dropdownRef}>
                        <ul className={styles.optionsList} role='listbox'>
                            {options.map(option => (
                                <li
                                    key={option.value}
                                    className={clsx(styles.option, {
                                        [styles.selected]: option.value === value,
                                    })}
                                    onClick={() => handleOptionClick(option.value)}
                                    role='option'
                                    aria-selected={option.value === value}>
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default Select;
