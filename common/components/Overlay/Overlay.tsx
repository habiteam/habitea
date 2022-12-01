import styles from './Overlay.module.scss';

export interface OverlayPropsSchema {
  children: React.ReactNode;
  onMouseDown?: () => void;
}

export default function Overlay({ children, onMouseDown }: OverlayPropsSchema) {
  return (
    <div className={styles.overlay} onMouseDown={onMouseDown}>
      {children}
    </div>
  );
}
