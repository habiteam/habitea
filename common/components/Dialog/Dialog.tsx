import { animated, easings, useTransition } from 'react-spring';
import Overlay from '@commonComponents/Overlay/Overlay';
import Button from '@commonComponents/Button/Button';
import { DialogPropsSchema } from '@schemas/dialog-props';
import { useEffect } from 'react';
import styles from './Dialog.module.scss';

export default function Dialog({
  title,
  actions,
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

  useEffect(() => {
    function handleEscapePress(event: KeyboardEvent) {
      if (event.code === 'Escape' && handleClose) {
        handleClose();
      }
    }
    document.addEventListener('keyup', handleEscapePress);

    return () => {
      document.removeEventListener('keyup', handleEscapePress);
    };
  }, []);

  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <Overlay onMouseDown={handleClose}>
              <animated.div
                onMouseDown={(e) => e.stopPropagation()}
                className={styles.dialog}
                style={style}
              >
                {title && <div className={styles.headline}>{title}</div>}
                {children}
                <div className={styles.spacer}></div>
                {actions && (
                  <div className={styles.actions}>
                    {actions.map((action, i) => (
                      <Button key={i} {...action}></Button>
                    ))}
                  </div>
                )}
              </animated.div>
            </Overlay>
          ),
      )}
    </>
  );
}
