import Button, { ButtonPropSchema } from '../../Button/Button';
import styles from './CardFooter.module.scss';
import { Color } from '../../../constants/Color';

export interface CardFooterActionsSchema
  extends Omit<ButtonPropSchema, 'children'> {
  text: string;
}

export interface CardFooterPropSchema {
  buttonColor?: Color;
  actions: CardFooterActionsSchema[];
}

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
