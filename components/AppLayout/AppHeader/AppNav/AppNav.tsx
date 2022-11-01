import {
  faAddressCard as faAddressCardRegular,
  faFolder as faFolderRegular,
} from '@fortawesome/free-regular-svg-icons';
import {
  faAddressCard as faAddressCardSolid,
  faBars,
  faFolder as faFolderSolid,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useState } from 'react';
import {
  MOBILE_BREAKPOINT,
  screenWidth,
} from '../../../../common/atoms/screenWidth';
import Button from '../../../../common/components/Button/Button';
import DropdownMenu from '../../../../common/components/DropdownMenu/DropdownMenu';
import NavLink from '../../../../common/components/NavLink/NavLink';
import styles from './AppNav.module.scss';

export default function AppNav() {
  const width = useAtomValue(screenWidth);

  const [isActionMenuOpened, setIsActionMenuOpened] = useState(false);

  const navLinks = [
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
        <div className={styles['nav-mobile']}>
          <Button
            fillType="regular"
            color="primary"
            onClick={() => setIsActionMenuOpened(!isActionMenuOpened)}
            size="lg"
          >
            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
          </Button>
          <DropdownMenu
            items={[
              ...navLinks,
              { text: 'Others', image: '/cat.jpg', href: '/app/options' },
            ]}
            color="primary"
            isOpen={isActionMenuOpened}
            onClose={() => setIsActionMenuOpened(false)}
          ></DropdownMenu>
        </div>
      )}
    </nav>
  );
}
