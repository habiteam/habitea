import {
  faAddressCard as faAddressCardRegular,
  faFolder as faFolderRegular,
} from '@fortawesome/free-regular-svg-icons';
import {
  faAddressCard as faAddressCardSolid,
  faFolder as faFolderSolid,
} from '@fortawesome/free-solid-svg-icons';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import {
  MOBILE_BREAKPOINT,
  screenWidth,
} from '../../../../common/atoms/screenWidth';
import NavLink, {
  NavLinkPropSchema,
} from '../../../../common/components/NavLink/NavLink';
import styles from './AppNav.module.scss';

export default function AppNav() {
  const width = useAtomValue(screenWidth);

  const navLinks: NavLinkPropSchema[] = [
    {
      icon: faAddressCardRegular,
      activeIcon: faAddressCardSolid,
      text: 'Dashboard',
      href: '/app/dashboard',
    },
    {
      icon: faFolderRegular,
      activeIcon: faFolderSolid,
      text: 'Categories',
      href: '/app/categories',
    },
  ];

  return (
    <nav className={styles.nav}>
      {width > MOBILE_BREAKPOINT ? (
        <div className={styles['nav-desktop']}>
          {navLinks.map((link, index) => (
            <NavLink key={index} {...link} color="primary"></NavLink>
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
