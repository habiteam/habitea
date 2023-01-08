import Head from 'next/head';
import Image from 'next/image';
import classNames from 'classnames';
import Router from 'next/router';
import heroBgImg from '@public/backgrounds/bg-blobs.svg';
import teaImg from '@public/tea.webp';
import banner1 from '@public/main/banner1.png';
import banner2 from '@public/main/banner2.png';
import banner3 from '@public/main/banner3.png';
import { auth } from '@services/firebase';
import Banner, { BannerItem } from '@commonComponents/Banner/Banner';
import Script from 'next/script';
import styles from './Home.module.scss';

export default function Home() {
  const bannerItems: BannerItem[] = [
    {
      image: banner1,
      title: 'Habitea',
      content:
        'is simple and easy-to-use habit tracker that will help you take control of your life and make positive changes that last',
    },
    {
      image: banner2,
      title: 'Tracking your habits',
      content:
        'can help you identify patterns, make changes, stay motivated, and build new habits. By tracking your habits, you can stay accountable and motivated as you work towards your goals',
    },
    {
      image: banner3,
      title: ' Application is free',
      content:
        'and open source. Have suggestions, ideas or want to contribute? Visit our GitHub repository.',
    },
  ];

  return (
    <>
      <Head>
        <title>Habitea</title>
        <meta name="description" content="Activity and habit tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script id="blobs">
        {`
          (async function () {
            if (CSS['paintWorklet'] === undefined) {
              await import('https://unpkg.com/css-paint-polyfill');
            }

            CSS.paintWorklet.addModule('blobs.js');
          })()
        `}
      </Script>

      <div className={classNames(styles.container, styles.blobs)}>
        <Image
          className={styles['background-image']}
          src={heroBgImg}
          alt={'background image'}
          fill
        ></Image>

        <div className={classNames(styles.card)}>
          <h1 className={classNames(styles.title)}>Habitea</h1>

          <h2 className={classNames(styles.subtitle)}>
            Activity and habit tracker
          </h2>

          <Banner items={bannerItems}></Banner>

          <button
            onClick={() => {
              Router.push(auth.currentUser ? '/app' : '/register');
            }}
            className={classNames(styles['main-action'])}
            color="default"
          >
            <strong>Get started</strong>
          </button>
        </div>

        <Image
          className={styles['image-tea']}
          src={teaImg}
          alt={'background image'}
          placeholder="blur"
        ></Image>
      </div>
    </>
  );
}
