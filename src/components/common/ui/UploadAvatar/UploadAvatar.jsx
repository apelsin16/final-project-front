import css from './UploadAvatar.module.css';
import icons from '/sprite.svg';

function UploadAvatar({ onClick, className = '' }) {
    return (
        <div className={`${css.uploadIcon} ${className}`} onClick={onClick}>
            <svg className={css.icon} width="16" height="16">
                <use href={`${icons}#plus`} />
            </svg>
        </div>
    );
}

export default UploadAvatar;
