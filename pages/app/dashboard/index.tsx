import { getAppLayout } from '@components/AppLayout/AppLayout';
import Tabs from '@commonComponents/Tabs/Tabs';
import { useState } from 'react';
import classnames from 'classnames';
import styles from './Dashboard.module.scss';

export default function Dashboard() {
  const tabContent = (tab: string) => {
    switch (tab) {
      case 'Categories':
        return <div>Tab 1 content</div>;
      case 'Calendar':
        return <div>Tab 2 content</div>;
      case 'Journal':
        return <div>Tab 3 content</div>;
      default:
        return <div>Tab 1 content</div>;
    }
  };

  const [currentTab, setCurrentTab] = useState('Categories');

  return (
    <div className={classnames(styles.container)}>
      <h2>Dashboard</h2>
      <Tabs
        tabs={[
          { key: 'Categories', title: 'Categories' },
          { key: 'Calendar', title: 'Calendar' },
          { key: 'Journal', title: 'Journal' },
        ]}
        activeTab={currentTab}
        setActiveTab={(key: string): void => {
          setCurrentTab(key);
        }}
      ></Tabs>
      {tabContent(currentTab)}
      <svg viewBox="0 0 15 15">
        <clipPath id="menu" clipPathUnits="objectBoundingBox">
          <path d="m 15 6 q 0 9 -10 9 m 0 0 l 10 0 l 0 -9" />
        </clipPath>
      </svg>
    </div>
  );
}

Dashboard.getLayout = getAppLayout;
