import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './Banner.module.scss';

export interface BannerItem {
  image: StaticImageData;
  title: string;
  content: ReactNode;
}

export interface BannerPropSchema {
  items: BannerItem[];
}

export default function Banner(props: BannerPropSchema) {
  const [activeItem, setActiveItem] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  function getWidthOfImage(index: number): string {
    if (index !== activeItem)
      return `calc(${(1 / (props.items.length + 6)) * 100}% - 8px)`;

    return `calc(${(7 / (props.items.length + 6)) * 100}% - 8px)`;
  }

  function handleInterval(): void {
    if (intervalId) clearInterval(intervalId);

    setIntervalId(
      setInterval(
        () => setActiveItem((prev) => (prev + 1) % props.items.length),
        5000,
      ),
    );
  }

  useEffect(() => {
    handleInterval();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className={classNames(styles.container)}>
        {props.items.map((item, index) => (
          <Image
            style={{ maxWidth: getWidthOfImage(index) }}
            key={index}
            className={classNames(styles.image)}
            src={item.image}
            alt="item"
            onClick={() => {
              handleInterval();
              setActiveItem(index);
            }}
          ></Image>
        ))}
      </div>

      {props.items.map(
        (item, index) =>
          activeItem === index && (
            <div className={classNames(styles.description)} key={index}>
              <div className={classNames(styles.title)}>{item.title}</div>
              <div className={classNames(styles.content)}>{item.content}</div>
            </div>
          ),
      )}
    </>
  );
}
