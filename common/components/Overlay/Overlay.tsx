import styles from './Overlay.module.scss';

export interface OverlayPropsSchema {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Overlay({ children, onClick }: OverlayPropsSchema) {
  return (
    <div className={styles.overlay} onClick={onClick}>
      {children}
    </div>
  );
}
