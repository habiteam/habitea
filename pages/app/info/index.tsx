import Block from '@commonComponents/Block/Block';
import Contributor from '@commonComponents/Contributor/Contributor';
import Link from '@commonComponents/Link/Link';
import { getAppLayout } from '@components/AppLayout/AppLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { faGear, faHouse, faMusic } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './Info.module.scss';

export default function Info() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tooltipName, setTooltipName] = useState<string | null>(null);

  useEffect(() => {
    const handleWindowMouseMove = (event: MouseEvent) => {
      let additionalY = 0;
      if (document.getElementById('appLayout')) {
        additionalY = document.getElementById('appLayout')?.scrollTop ?? 0;
      }

      setCoords({
        x: event.clientX + 12,
        y: event.clientY + 12 + additionalY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  const contributors = [
    {
      name: 'Nikodem Zawirski',
      href: 'https://github.com/nzawirski',
      img: 'https://avatars.githubusercontent.com/u/43851876?v=4',
    },
    {
      name: 'Adrian Sitko',
      href: 'https://github.com/Shirokone',
      img: 'https://avatars.githubusercontent.com/u/43843598?v=4',
    },
  ];

  return (
    <>
      <Head>
        <title>Info - Habitea</title>
      </Head>

      <div className={classNames(styles.container)}>
        <Block title="Info">
          <p>
            <strong>Habitea</strong> is a platform to collect your habits /
            activities throughout the day, week or month.
          </p>

          <p>
            To start you can head to
            <Link color="primary" href="/app/categories">
              <FontAwesomeIcon icon={faFolder}></FontAwesomeIcon> categories
            </Link>
            page. There you can create category for your habit like &apos;
            <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon> Listening to
            music&apos;.
          </p>

          <p>
            When you make some progress in your category, create activity on
            <Link color="primary" href="/app/home">
              <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon> home
            </Link>
            screen. Fill the necessary info, change time of activity if needed.
          </p>

          <p>
            On
            <Link color="primary" href="/app/options">
              <FontAwesomeIcon icon={faGear}></FontAwesomeIcon> options
            </Link>
            page you can set different theme.
          </p>
        </Block>
        <Block title="Github">
          This app is still in development.
          <p>
            Want to contribute? Visit us at
            <Link
              color="primary"
              target="_blank"
              href="https://github.com/habiteam/habitea"
            >
              <FontAwesomeIcon icon={faGithub as IconProp}></FontAwesomeIcon>{' '}
              Github.
            </Link>
          </p>
          <p>
            Encountered an issue or have any suggestions? You can report it
            <Link
              color="primary"
              target="_blank"
              href="https://github.com/habiteam/habitea/issues"
            >
              here.
            </Link>
          </p>
        </Block>

        {/* <Block title="Version">
          Currently we are preparing for version:
          <Link
            color="primary"
            target="_blank"
            href="https://github.com/habiteam/habitea/milestone/1"
          >
            1.0.0
          </Link>
        </Block> */}

        <Block title="Contributors">
          <div className={classNames(styles['contributors-container'])}>
            {contributors.map((contributor) => (
              <Contributor
                key={contributor.name}
                {...contributor}
                target="_blank"
                onMouseEnter={(name) => setTooltipName(name)}
                onMouseLeave={() => setTooltipName(null)}
              ></Contributor>
            ))}
          </div>

          {tooltipName !== null && (
            <div
              className={styles.tooltip}
              style={{ top: `${coords.y}px`, left: `${coords.x}px` }}
            >
              {tooltipName}
            </div>
          )}
        </Block>
      </div>
    </>
  );
}

Info.getLayout = getAppLayout;
