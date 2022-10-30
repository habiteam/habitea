import NextLink from 'next/link';
import styles from './Link.module.scss';
import { LinkPropSchema } from './Link.schema';

export default function Link(props: LinkPropSchema) {
  return (
    <NextLink href={props.href} legacyBehavior>
      <a
        className={`${styles.link} ${
          styles[`link--${props.color ?? 'default'}`]
        }`}
      >
        {props.children}
      </a>
    </NextLink>
  );
}
