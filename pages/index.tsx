import Head from 'next/head';
import Image from 'next/image';
import classNames from 'classnames';
import Router from 'next/router';
import heroBgImg from '@public/backgrounds/bg-blobs.svg';
import deskBg from '@public/backgrounds/bg-main.jpg';
import teaImg from '@public/tea.webp';
import banner1 from '@public/main/banner1.png';
import banner2 from '@public/main/banner2.png';
import banner3 from '@public/main/banner3.png';
import { auth } from '@services/firebase';
import Banner, { BannerItem } from '@commonComponents/Banner/Banner';
import Script from 'next/script';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import TopBar from '@components/TopBar/TopBar';
import styles from './Home.module.scss';

export default function Home() {
  const bannerItems: BannerItem[] = [
    {
      image: banner1,
      title: 'Track your habits',
      content: (
        <>
          <p>
            Add habits you want to track and set a goal for each one. You can
            track your progress and see how you are doing over time.
          </p>
        </>
      ),
    },
    {
      image: banner2,
      title: 'Monitor your progress',
      content: (
        <>
          <p>
            See how you are doing over time. Monitoring your progress will help
            you stay accountable and motivated.
          </p>
        </>
      ),
    },
    {
      image: banner3,
      title: 'Grow',
      content: (
        <>
          <p>
            You become what you repeat. Improve your life by building new habits
            and making positive changes that last.
          </p>
        </>
      ),
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

      <TopBar>
        <span>
          This app is still in developement. If you have suggestions or
          encounter problems, let us know over at{' '}
          <a
            style={{ color: 'white', textDecoration: 'underline' }}
            href="https://github.com/habiteam/habitea/issues"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </span>
      </TopBar>

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
          <p>
            Habitea is <strong>simple and easy-to-use</strong> habit tracker
            that will help you take control of your life and make positive
            changes that last.
          </p>
          <p>
            <strong>Tracking your habits</strong> can help you identify
            patterns, make changes, stay motivated, and build new habits. By
            tracking your habits, you can{' '}
            <strong>stay accountable and motivated</strong> as you work towards
            your goals.
          </p>

          <button
            onClick={() => {
              Router.push(auth.currentUser ? '/app' : '/register');
            }}
            className={classNames(styles['main-action'])}
            color="default"
          >
            <strong>Get started</strong>
          </button>

          <p>
            This application is free and open source under the{' '}
            <a
              href="https://www.gnu.org/licenses/agpl-3.0-standalone.html"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              GNU Affero General Public License
            </a>
            .
          </p>

          <p>Have suggestions, ideas or want to contribute?</p>

          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}
          >
            <a
              className={styles['gh-cta']}
              href={'https://github.com/habiteam/habitea'}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faGithub as IconProp}></FontAwesomeIcon>
              &nbsp;View source code
            </a>
            <a
              className={styles['gh-cta']}
              href={'https://github.com/habiteam/habitea/issues'}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faLightbulb as IconProp}></FontAwesomeIcon>
              &nbsp;Report an issue
            </a>
          </div>
        </div>

        <Image
          className={styles['image-tea']}
          src={teaImg}
          alt={'background image'}
          priority={true}
        ></Image>

        <div
          onClick={() => document.getElementById('section-1')?.scrollIntoView()}
          className={classNames(styles['scroll-down-prompt'])}
        >
          <span>Scroll down to learn more</span>
        </div>
      </div>

      <div className={classNames(styles.container)} id="section-1">
        <Image
          className={styles['background-image']}
          src={deskBg}
          alt={'background image'}
          fill
        ></Image>

        <div className={classNames(styles['banner-container'])}>
          <div className={styles.grid}>
            <Banner items={bannerItems} imageHeight="420px"></Banner>
          </div>

          <button
            onClick={() => {
              Router.push(auth.currentUser ? '/app' : '/register');
            }}
            className={classNames(styles['main-action'])}
            color="default"
          >
            <strong>Go to app</strong>
          </button>
        </div>
      </div>
    </>
  );
}
