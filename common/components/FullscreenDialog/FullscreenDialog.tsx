import Button, { ButtonPropSchema } from '@commonComponents/Button/Button';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useEffect, RefObject } from 'react';
import { easings, useTransition, animated } from 'react-spring';
import styles from './FullscreenDialog.module.scss';

export interface FullscreenDialogPropsSchema {
  title?: string;
  actions?: ButtonPropSchema[];
  children: React.ReactNode;
  open: boolean;
  handleClose?: () => void;
  anchorRef?: RefObject<HTMLElement>;
}

export default function FullscreenDialog({
  title,
  actions,
  children,
  open,
  handleClose,
  anchorRef,
}: FullscreenDialogPropsSchema) {
  const transition = useTransition(open, {
    from: {
      opacity: 0,
      top: anchorRef?.current?.offsetTop
        ? `${anchorRef?.current?.offsetTop}px`
        : '50%',
      left: anchorRef?.current?.offsetLeft
        ? `${anchorRef?.current?.offsetLeft}px`
        : '50%',
      width: `calc(0% + ${anchorRef?.current?.clientWidth ?? 0}px)`,
      height: `calc(0% + ${anchorRef?.current?.clientHeight ?? 0}px)`,
    },
    enter: {
      opacity: 1,
      top: `0px`,
      left: `0px`,
      width: `calc(100% + 0px)`,
      height: `calc(100% + 0px)`,
    },
    leave: {
      opacity: 0,
      top: anchorRef?.current?.offsetTop
        ? `${anchorRef?.current?.offsetTop}px`
        : '50%',
      left: anchorRef?.current?.offsetLeft
        ? `${anchorRef?.current?.offsetLeft}px`
        : '50%',
      width: `calc(0% + ${anchorRef?.current?.clientWidth ?? 0}px)`,
      height: `calc(0% + ${anchorRef?.current?.clientHeight ?? 0}px)`,
    },

    config: { duration: 400, easing: easings.easeInCubic },
  });

  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <animated.div style={style} className={classNames(styles.dialog)}>
              <div className={classNames(styles['dialog-header'])}>
                <h1>{title}</h1>
                <div className={classNames(styles.spacer)}></div>
                <Button
                  fillType="regular"
                  onClick={() => {
                    if (handleClose) {
                      handleClose();
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                </Button>
              </div>

              <div className={classNames(styles['dialog-content'])}>
                {children}
              </div>

              <div className={classNames(styles['dialog-footer'])}>
                <div className={classNames(styles.spacer)}></div>
                {actions && (
                  <div className={styles.actions}>
                    {actions.map((action, i) => (
                      <Button key={i} {...action}></Button>
                    ))}
                  </div>
                )}
              </div>
            </animated.div>
          ),
      )}
    </>
  );
}
