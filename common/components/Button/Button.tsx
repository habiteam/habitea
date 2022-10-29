import styles from './Button.module.scss';
import { ButtonPropSchema } from './Button.schema';

/**
 * TODO onClick
 * TODO disabled
 * TODO default :hover
 *
 * @param props
 * @returns
 */
export default function Button(props: ButtonPropSchema) {
  return (
    <button
      className={`${styles.button}
         ${styles[`button--${props.color ?? 'default'}`]}
         ${styles[`button--${props.fillType}`]}
         `}
    >
      {props.children}
    </button>
  );
}
