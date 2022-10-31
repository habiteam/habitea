import { useAtomValue } from 'jotai';
import Image from 'next/image';
import {
  MOBILE_BREAKPOINT,
  screenWidth,
} from '../../../../common/atoms/screenWidth';
import Link from '../../../../common/components/Link/Link';
import styles from './AppNav.module.scss';

export default function AppNav() {
  const width = useAtomValue(screenWidth);

  const navLinks = [
    { title: 'Dashboard', href: '/app/dashboard' },
    { title: 'Categories', href: '/app/categories' },
  ];

  return (
    <nav className={styles.nav}>
      {width > MOBILE_BREAKPOINT ? (
        <div className={styles['fade-in']}>
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href} color="primary">
              {link.title}
            </Link>
          ))}

          <Image
            src="/cat.jpg"
            alt="Card header image"
            width={40}
            height={40}
            className={styles['nav-avatar']}
          ></Image>
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
}
