import styles from './Card.module.scss';
import { CardPropSchema } from './Card.schema';

export default function Card(props: CardPropSchema) {
  return (
    <div
      style={{ maxWidth: props.maxWidth ?? '100%' }}
      className={`${styles.card} ${
        styles[`card--${props.appearance ?? 'outlined'}`]
      } ${styles[`card--color-${props.color ?? 'default'}`]}`}
    >
      {props.children}
    </div>
  );
}
