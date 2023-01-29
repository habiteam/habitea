import { useAtom, useSetAtom } from 'jotai';
import React, { ReactElement, useEffect } from 'react';
import { screenHeightAtom, screenWidthAtom } from '@atoms/screen';
import { themeAtom } from '@atoms/theme';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '@services/firebase';
import { userAtom } from '@atoms/user';
import AppHeader from './AppHeader/AppHeader';
import styles from './AppLayout.module.scss';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout(props: AppLayoutProps) {
  const setWidth = useSetAtom(screenWidthAtom);
  const setHeight = useSetAtom(screenHeightAtom);

  const [theme, setTheme] = useAtom(themeAtom);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
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
    <div className={styles.layout} id="appLayout">
      <AppHeader />
      <div className={styles.main}>{props.children}</div>
    </div>
  );
}

export function getAppLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
}
