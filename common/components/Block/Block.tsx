import classNames from 'classnames';
import styles from './Block.module.scss';

interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title?: string;
}

export default function Block(props: BlockProps) {
  return (
    <div {...props} className={classNames(styles.block, props.className)}>
      {props.title && <h2>{props.title}</h2>}
      {props.children}
    </div>
  );
}
