import classNames from 'classnames';
import { useEffect } from 'react';
import { animated, config, useSpring } from '@react-spring/web';
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
  const [tabTransition, setTabTransition] = useSpring(
    () => ({
      from: { width: '0px', left: '0px' },
      to: { width: '0px', left: '0px' },
      config: config.gentle,
    }),
    [],
  );

  const onTabChange = (key: string) => {
    setActiveTab(key);
    const activeTabEl = document.querySelector(`#${key}`) as HTMLDivElement;

    setTabTransition({
      width: `${activeTabEl.clientWidth}px`,
      left: `${activeTabEl.offsetLeft}px`,
    });
  };

  useEffect(() => {
    onTabChange(activeTab);
  }, []);

  return (
    <div className={classNames(styles.tabs)}>
      <animated.div
        style={tabTransition}
        className={classNames(styles['active-tab-bg'])}
      ></animated.div>
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
