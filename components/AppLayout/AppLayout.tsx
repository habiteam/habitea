import { useAtom, useSetAtom } from 'jotai';
import React, { ReactElement, useEffect } from 'react';
import { screenHeight, screenWidth } from '@atoms/screen';
import themeAtom from '@atoms/theme';
import AppHeader from './AppHeader/AppHeader';
import styles from './AppLayout.module.scss';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout(props: AppLayoutProps) {
  const setWidth = useSetAtom(screenWidth);
  const setHeight = useSetAtom(screenHeight);

  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    document.body.className = theme;
    // localStorage.setItem('theme', theme);
  }, [theme]);
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  function setWidthAndHeight() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    setWidthAndHeight();

    const handleResizeWindow = () => setWidthAndHeight();

    window.addEventListener('resize', handleResizeWindow);

    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  return (
    <div className={styles.layout}>
      <AppHeader />
      <div className={styles.main}>{props.children}</div>
    </div>
  );
}

export function getAppLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
}
