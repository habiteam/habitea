import styles from './Button.module.scss';
import { ButtonPropSchema } from './Button.schema';

/**
 * TODO disabled
 *
 * @param props
 * @returns
 */
export default function Button(props: ButtonPropSchema) {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.button}
         ${styles[`button--${props.color ?? 'default'}`]}
         ${styles[`button--${props.fillType}`]}
         `}
    >
      {props.children}
    </button>
  );
}
