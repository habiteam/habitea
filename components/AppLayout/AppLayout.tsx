import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { screenWidth } from '../../common/atoms/screen-width';
import { auth } from '../../common/services/firebase';
import AppHeader from './AppHeader/AppHeader';
import styles from './AppLayout.module.scss';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout(props: AppLayoutProps) {
  const setWidth = useSetAtom(screenWidth);

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleResizeWindow = () => setWidth(window.innerWidth);

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
