import styles from './CardContent.module.scss';

export interface CardContentPropSchema {
  children?: React.ReactNode;
}

export default function CardContent(props: CardContentPropSchema) {
  return <div className={styles['card-content']}>{props.children}</div>;
}
