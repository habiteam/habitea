import Head from 'next/head';
import Image from 'next/image';
import classNames from 'classnames';
import Router from 'next/router';
import heroBgImg from '@public/backgrounds/bg-main.jpg';
import blobImg from '@public/backgrounds/bg-blobs.svg';
import { auth } from '@services/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Habitea</title>
        <meta name="description" content="Activity and habit tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={classNames(styles.container, styles['gradient-one'])}>
        <Image
          className={styles['background-image']}
          src={heroBgImg}
          alt={'background image'}
          placeholder="blur"
          fill
          style={{ objectPosition: 'left' }}
        ></Image>
        <div className={classNames(styles.grid)}>
          <span className={classNames(styles.quote)}>
            The future doesn&apos;t just happen. We are building it, and we are
            building it all the time. -Hannah Fry
          </span>
        </div>
        <div className={classNames(styles.grid)}>
          <div className={classNames(styles.section)}>
            <h1 className={classNames(styles.title)}>Habitea</h1>
            <h2 className={classNames(styles.subtitle)}>
              Activity and habit tracker
            </h2>
            <p>
              <strong>Tracking your habits</strong> can help you identify
              patterns, make changes, stay motivated, and build new habits. By
              tracking your habits, you can stay accountable and motivated as
              you work towards your goals
            </p>
            <p>
              <strong>Habitea</strong> is a{' '}
              <strong>simple and easy-to-use</strong> habit tracker that will
              help you take control of your life and make positive changes that
              last.
            </p>
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
      </div>
      {/*  */}
      <div className={classNames(styles.container, styles['gradient-two'])}>
        <Image
          className={styles['background-image']}
          src={blobImg}
          alt={'background image'}
          fill
        ></Image>
        <div className={classNames(styles.grid)}>
          <span className={classNames(styles.quote)}>
            Be the designer of your world and not merely the consumer of it.
            -James Clear
          </span>
        </div>
        <div className={classNames(styles.grid)}>
          <div className={classNames(styles.section)}>
            <h1 className={classNames(styles.title)}>Habitea</h1>
            <h2 className={classNames(styles.subtitle)}>Made for you</h2>
            <p>
              Habitea is free and open source software.
              <br />
              Have suggestions, ideas or want to contribute?
            </p>
            <a
              href="https://github.com/habiteam/habitea"
              target="_blank"
              rel="noreferrer"
              className={classNames(styles['gh-link'])}
            >
              <FontAwesomeIcon icon={faGithub as IconProp}></FontAwesomeIcon>
              &nbsp; Visit our GitHub repository
            </a>
          </div>
          <div className={classNames(styles.section)}></div>
        </div>
      </div>
    </>
  );
}
