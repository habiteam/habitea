import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './Banner.module.scss';

export interface BannerItem {
  image: StaticImageData;
  title: string;
  content: string;
}

export interface BannerPropSchema {
  items: BannerItem[];
}

export default function Banner(props: BannerPropSchema) {
  const [activeItem, setActiveItem] = useState<number>(0);

  function getWidthOfImage(index: number): string {
    if (index !== activeItem)
      return `calc(${(1 / (props.items.length + 4)) * 100}% - 12px)`;

    return `calc(${(5 / (props.items.length + 4)) * 100}% - 12px)`;
  }

  useEffect(() => {
    const interval = setInterval(
      () => setActiveItem((prev) => (prev + 1) % props.items.length),
      5000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={classNames(styles.container)}>
        {props.items.map((item, index) => (
          <Image
            style={{ width: getWidthOfImage(index) }}
            key={index}
            className={classNames(styles.image)}
            src={item.image}
            alt="item"
            onClick={() => setActiveItem(index)}
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
