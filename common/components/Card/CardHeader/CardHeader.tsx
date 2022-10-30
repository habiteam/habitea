import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Button from '../../Button/Button';
import styles from './CardHeader.module.scss';
import { CardHeaderPropSchema } from './CardHeader.schema';

export default function CardHeader(props: CardHeaderPropSchema) {
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
          >
            <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
          </Button>
        </div>
      )}
    </div>
  );
}
