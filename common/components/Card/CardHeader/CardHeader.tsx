import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../../Button/Button';
import styles from './CardHeader.module.scss';
import { Color } from '../../../constants/Color';
import DropdownMenu, {
  DropdownMenuItem,
} from '../../DropdownMenu/DropdownMenu';

export interface CardHeaderPropSchema {
  title: string;
  image?: string;
  subTitle?: string;
  actions?: DropdownMenuItem[];
  actionsButtonColor?: Color;
  actionsMenuColor?: Color;
}

export default function CardHeader(props: CardHeaderPropSchema) {
  const [isActionMenuOpened, setIsActionMenuOpened] = useState(false);

  return (
    <div className={styles['card-header']}>
      {props.image && (
        <Image
          src={props.image}
          alt="Card header image"
          width={40}
          height={40}
          className={styles['card-header__image']}
        ></Image>
      )}
      <div className={styles['card-header__content']}>
        <span className={styles['card-header__title']}>{props.title}</span>
        {props.subTitle && (
          <span className={styles['card-header__subtitle']}>
            {props.subTitle}
          </span>
        )}
      </div>
      {props.actions && (
        <div>
          <Button
            fillType="regular"
            color={props.actionsButtonColor ?? 'default'}
            onClick={() => setIsActionMenuOpened(!isActionMenuOpened)}
          >
            <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
          </Button>
          <DropdownMenu
            items={props.actions}
            color={props.actionsMenuColor}
            isOpen={isActionMenuOpened}
            onClose={() => setIsActionMenuOpened(false)}
          ></DropdownMenu>
        </div>
      )}
    </div>
  );
}
