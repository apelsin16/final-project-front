import css from './TabItem.module.css';

export const TabItem = ({ name, isActive, onClick }) => {
  return (
    <button
      className={`${css['tab-button']} ${isActive ? css['active'] : ''}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};
