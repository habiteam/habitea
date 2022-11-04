import { useEffect, useRef } from 'react';
import styles from './Dialog.module.scss';

export interface DialogPropsSchema
  extends React.DetailedHTMLProps<
    React.DialogHTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {
  handleClose?: () => void;
}

export default function Dialog(props: DialogPropsSchema) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    function closeDialog() {
      dialogRef.current?.close();
      if (props.handleClose) {
        props.handleClose();
      }
    }

    function handleClickOutside(event: MouseEvent) {
      const rect = dialogRef.current?.getBoundingClientRect();
      if (rect) {
        if (
          !(
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width
          )
        )
          closeDialog();
      }
    }

    if (props.open) {
      dialogRef.current?.showModal();
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      closeDialog();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props.open]);

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      {props.children}
    </dialog>
  );
}
