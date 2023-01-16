import Button from '@commonComponents/Button/Button';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useRef,
} from 'react';
import styles from './TopBar.module.scss';

export default function TopBar(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={styles['top-bar']}>
      <div></div>
      <div>{props.children}</div>
      <div>
        <Button
          onClick={() => {
            ref.current?.classList.add(styles['top-bar--hidden']);
          }}
          fillType={'regular'}
        >
          <FontAwesomeIcon icon={faClose as IconProp}></FontAwesomeIcon>
        </Button>
      </div>
    </div>
  );
}
