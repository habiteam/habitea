import {
  faAddressCard as faAddressCardRegular,
  faFolder as faFolderRegular,
} from '@fortawesome/free-regular-svg-icons';
import {
  faAddressCard as faAddressCardSolid,
  faArrowRightFromBracket,
  faFolder as faFolderSolid,
  faGear,
  faHouse,
  faHouseUser,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { signOut } from 'firebase/auth';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import Router from 'next/router';
import { useState } from 'react';
import DropdownMenu from '@commonComponents/DropdownMenu/DropdownMenu';
import NavLink from '@commonComponents/NavLink/NavLink';
import { auth } from '@services/firebase';
import { MOBILE_BREAKPOINT, screenWidth } from '@atoms/screen';
import styles from './AppNav.module.scss';

export default function AppNav() {
  const width = useAtomValue(screenWidth);

  const [isActionMenuOpened, setIsActionMenuOpened] = useState(false);

  const navLinks = [
    {
      icon: faHouse,
      activeIcon: faHouseUser,
      text: 'Home',
      href: '/app/home',
    },
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

  const navAvatar = [
    { text: 'Settings', icon: faGear, href: '/app/options' },
    {
      text: 'Sign out',
      icon: faArrowRightFromBracket,
      onClick: () => {
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            console.log('sajonara');
            Router.push('/');
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
  ];

  return (
    <nav className={styles['nav-wrapper']}>
      <div className={styles.nav}>
        {width > MOBILE_BREAKPOINT && (
          <>
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} color="primary"></NavLink>
            ))}
          </>
        )}

        <div style={{ height: '40px' }}>
          <Image
            src="/cat.jpg"
            alt="Card header image"
            width={40}
            height={40}
            onClick={() => setIsActionMenuOpened(!isActionMenuOpened)}
            className={classNames(styles['nav-avatar'], {
              [styles['nav-avatar--active']]: isActionMenuOpened,
            })}
          ></Image>

          <DropdownMenu
            items={[
              ...(width < MOBILE_BREAKPOINT ? navLinks : []),
              ...navAvatar,
            ]}
            color="primary"
            isOpen={isActionMenuOpened}
            onClose={() => setIsActionMenuOpened(false)}
          ></DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
