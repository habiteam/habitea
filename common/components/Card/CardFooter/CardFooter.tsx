import Button from '../../Button/Button';
import styles from './CardFooter.module.scss';
import { CardFooterPropSchema } from './CardFooter.schema';

export default function CardFooter(props: CardFooterPropSchema) {
  return (
    <div className={styles['card-footer']}>
      {props.actions.map((action, i) => (
        <Button
          key={i}
          onClick={action.onClick}
          fillType={action.fillType}
          color={props.buttonColor ?? 'default'}
        >
          {action.text}
        </Button>
      ))}
    </div>
  );
}
