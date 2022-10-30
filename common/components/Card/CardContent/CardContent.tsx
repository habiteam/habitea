import styles from './CardContent.module.scss';
import { CardContentPropSchema } from './CardContent.schema';

export default function CardContent(props: CardContentPropSchema) {
  return <div className={styles['card-content']}>{props.children}</div>;
}
