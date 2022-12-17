import classNames from 'classnames';
import { useEffect } from 'react';
import styles from './Tabs.module.scss';

export interface TabSchema {
  key: string;
  title: string;
  icon?: string;
}

export interface TabsPropsSchema {
  tabs: TabSchema[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Tabs({
  tabs,
  activeTab,
  setActiveTab,
}: TabsPropsSchema) {
  const onTabChange = (key: string) => {
    setActiveTab(key);
    const activeTabEl = document.querySelector(`#${key}`) as HTMLDivElement;
    const activeTabBg = document.querySelector(
      `.${styles['active-tab-bg']}`,
    ) as HTMLDivElement;
    activeTabBg.style.width = `${activeTabEl.clientWidth}px`;
    activeTabBg.style.left = `${activeTabEl.offsetLeft}px`;
  };

  useEffect(() => {
    onTabChange(activeTab);
  }, []);

  return (
    <div className={classNames(styles.tabs)}>
      <div className={classNames(styles['active-tab-bg'])}></div>
      {tabs.map((tab) => (
        <div
          key={tab.key}
          id={tab.key}
          className={classNames(styles.tab, {
            [styles['tab--active']]: tab.key === activeTab,
          })}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.title}
        </div>
      ))}
    </div>
  );
}
