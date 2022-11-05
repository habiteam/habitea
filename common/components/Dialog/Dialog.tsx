import { animated, easings, useTransition } from 'react-spring';
import Overlay from '../Overlay/Overlay';
import styles from './Dialog.module.scss';

export interface DialogPropsSchema {
  children: React.ReactNode;
  open: boolean;
  handleClose?: () => void;
}

export default function Dialog({
  children,
  open,
  handleClose,
}: DialogPropsSchema) {
  const transition = useTransition(open, {
    from: { opacity: 0, transform: 'scaleY(0.2) translateY(-200px)' },
    enter: { opacity: 1, transform: 'scaleY(1) translateY(0px)' },
    leave: { opacity: 0, transform: 'scaleY(0) translateY(-200px)' },
    config: { duration: 250, easing: easings.easeInCubic },
  });

  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <Overlay onClick={handleClose}>
              <animated.div
                onClick={(e) => e.stopPropagation()}
                className={styles.dialog}
                style={style}
              >
                {children}
              </animated.div>
            </Overlay>
          ),
      )}
    </>
  );
}
