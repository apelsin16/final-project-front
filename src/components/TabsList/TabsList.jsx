import { TabItem } from '../TabItem/TabItem';

import css from './TabsList.module.css';

export const TabsList = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className={css['tabs-wrapper']}>
      <ul className={css['tabs-list']}>
        {tabs.map(tab => (
          <li key={tab}>
            <TabItem
              name={tab}
              isActive={tab === activeTab}
              onClick={() => onTabClick(tab)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
