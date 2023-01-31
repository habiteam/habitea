import {
  faAddressCard as faAddressCardRegular,
  faCircleQuestion,
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
import { MOBILE_BREAKPOINT, screenWidthAtom } from '@atoms/screen';
import { userAtom } from '@atoms/user';
import styles from './AppNav.module.scss';

export default function AppNav() {
  const width = useAtomValue(screenWidthAtom);

  const [isActionMenuOpened, setIsActionMenuOpened] = useState(false);

  const user = useAtomValue(userAtom);

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
    { text: 'Options', icon: faGear, href: '/app/options' },
    { text: 'Info', icon: faCircleQuestion, href: '/app/info' },
    {
      text: 'Sign out',
      icon: faArrowRightFromBracket,
      onClick: () => {
        signOut(auth)
          .then(() => {
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
            src={user?.photoURL ?? '/cat.jpg'}
            alt="User avatar"
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
