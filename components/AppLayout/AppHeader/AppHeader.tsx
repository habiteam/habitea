import Link from 'next/link';
import React from 'react';
import styles from './AppHeader.module.scss';
import AppNavbar from './AppNav/AppNav';

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <Link href="/app">
        <span className={styles['header-logo']}>Habitea</span>
      </Link>

      <div className={styles['header-spacer']}></div>

      <AppNavbar></AppNavbar>
    </header>
  );
}
