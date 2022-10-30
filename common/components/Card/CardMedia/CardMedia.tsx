import Image from 'next/image';
import styles from './CardMedia.module.scss';

export interface CardMediaPropSchema {
  alt: string;
  image: string;
}

export default function CardMedia(props: CardMediaPropSchema) {
  return (
    <div className={styles['card-media']}>
      <Image src={props.image} alt={props.alt} fill></Image>
    </div>
  );
}
