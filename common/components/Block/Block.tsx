import classNames from 'classnames';
import styles from './Block.module.scss';

interface BlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function Block(props: BlockProps) {
  return (
    <div className={classNames(styles.block, props.className)}>
      {props.children}
    </div>
  );
}
