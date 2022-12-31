import Head from 'next/head';
import Image from 'next/image';
import classNames from 'classnames';
import Router from 'next/router';
import heroBgImg from '@public/backgrounds/bg-main.jpg';
import { auth } from '@services/firebase';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Habitea</title>
        <meta name="description" content="Activity and habit tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.hero}>
        <Image
          className={styles['background-image']}
          src={heroBgImg}
          alt={'background image'}
          placeholder="blur"
          fill
        ></Image>
        <div className={styles.hello}>
          <h1 className={classNames(styles.title)}>Habitea</h1>
          <h2 className={classNames(styles.subtitle)}>
            Get in control of your habits
          </h2>
          <span className={styles.quote}>
            “Until you make the unconscious conscious, it will direct
            your&nbsp;life and you will call it fate.”
          </span>
          <button
            onClick={() => {
              Router.push(auth.currentUser ? '/app' : '/register');
            }}
            className={classNames(styles.cta)}
            color="default"
          >
            <strong>Get started</strong>
          </button>
        </div>
      </div>
    </>
  );
}
