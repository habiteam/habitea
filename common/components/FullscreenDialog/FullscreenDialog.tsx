import Button, { ButtonPropSchema } from '@commonComponents/Button/Button';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import styles from './FullscreenDialog.module.scss';

export interface FullscreenDialogPropsSchema {
  title?: string;
  actions?: ButtonPropSchema[];
  children: React.ReactNode;
  open: boolean;
  handleClose?: () => void;
}

export default function FullscreenDialog({
  title,
  actions,
  children,
  open,
  handleClose,
}: FullscreenDialogPropsSchema) {
  return (
    <>
      {open && (
        <div className={classNames(styles.dialog)}>
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

          <div className={classNames(styles['dialog-content'])}>{children}</div>

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
        </div>
      )}
    </>
  );
}
