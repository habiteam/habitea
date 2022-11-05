import styles from './Overlay.module.scss';

export interface OverlayPropsSchema {
  children: React.ReactNode;
  onClick?: () => void;
}

const Overlay = ({ children, onClick }: OverlayPropsSchema) => (
  <div className={styles.overlay} onClick={onClick}>
    {children}
  </div>
);

export default Overlay;
