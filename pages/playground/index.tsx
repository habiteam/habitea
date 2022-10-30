import { faFaceAngry } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import React from 'react';
import Button from '../../common/components/Button/Button';
import Card from '../../common/components/Card/Card';
import CardContent from '../../common/components/Card/CardContent/CardContent';
import CardFooter from '../../common/components/Card/CardFooter/CardFooter';
import { CardFooterActionsSchema } from '../../common/components/Card/CardFooter/CardFooter.schema';
import CardHeader from '../../common/components/Card/CardHeader/CardHeader';
import CardMedia from '../../common/components/Card/CardMedia/CardMedia';
import Input from '../../common/components/Input/Input';
import Link from '../../common/components/Link/Link';
import { Color } from '../../common/constants/Color';

export default function Playground() {
  const colors: Color[] = [
    'default',
    'primary',
    'warning',
    'danger',
    'info',
    'success',
  ];

  const cardFooterActions: CardFooterActionsSchema[] = [
    { text: 'Cancel', fillType: 'regular' },
    { text: 'Save', fillType: 'filled' },
  ];

  return (
    <>
      <Head>
        <title>Habitea - Playground</title>
      </Head>

      <div>
        <h2>Outlined Buttons</h2>
        {colors.map((color, i) => (
          <Button
            key={i}
            onClick={() => {
              console.log(color);
            }}
            fillType="outlined"
            color={color}
          >
            Click this bad boi&nbsp;
            <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
          </Button>
        ))}
      </div>

      <div>
        <h2>Filled Buttons</h2>
        {colors.map((color, i) => (
          <Button
            key={i}
            onClick={() => {
              console.log(color);
            }}
            fillType="filled"
            color={color}
          >
            Click this bad boi&nbsp;
            <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
          </Button>
        ))}
      </div>

      <div>
        <h2>Inputs</h2>
        {colors.map((color, i) => (
          <Input key={i} title="Title" id="id" color={color}></Input>
        ))}
      </div>

      <div>
        <h2>Links</h2>
        {colors.map((color, i) => (
          <p key={i}>
            Some text
            <Link href="app" color={color}>
              Click this bad&nbsp;
              <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon> boi
            </Link>{' '}
            more text
          </p>
        ))}
      </div>

      <h2>Cards</h2>
      <div
        style={{
          margin: '32px',
        }}
      >
        <Card maxWidth="360px">
          <CardHeader
            title="Title"
            subTitle="12.12.2012"
            image="/cat.jpg"
            actions={[]}
          ></CardHeader>
          <CardMedia image="/dog.jpg" alt="cat image"></CardMedia>
          <CardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            euismod quis ligula vel rutrum. Integer sed ex aliquet mi bibendum
            convallis. Praesent fermentum ante in sapien posuere luctus. Sed sit
            amet nunc at ante hendrerit commodo in ac augue. Duis eu libero eget
            odio ornare aliquam.
          </CardContent>
          <CardFooter actions={cardFooterActions}></CardFooter>
        </Card>

        {colors.map((color, i) => (
          <div
            key={i}
            style={{
              marginTop: '32px',
              display: 'flex',
              flexDirection: 'row',
              gap: '32px',
            }}
          >
            <Card maxWidth="360px" appearance="elevated" color={color}>
              <CardHeader
                title="Title"
                subTitle="12.12.2012"
                image="/cat.jpg"
                actions={[]}
              ></CardHeader>
              <CardMedia image="/dog.jpg" alt="cat image"></CardMedia>
              <CardContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                euismod quis ligula vel rutrum. Integer sed ex aliquet mi
                bibendum convallis. Praesent fermentum ante in sapien posuere
                luctus. Sed sit amet nunc at ante hendrerit commodo in ac augue.
                Duis eu libero eget odio ornare aliquam.
              </CardContent>
              <CardFooter
                buttonColor={color}
                actions={cardFooterActions}
              ></CardFooter>
            </Card>

            <Card maxWidth="360px" appearance="filled" color={color}>
              <CardHeader
                title="Title"
                subTitle="12.12.2012"
                image="/cat.jpg"
                actions={[]}
              ></CardHeader>
              <CardMedia image="/dog.jpg" alt="cat image"></CardMedia>
              <CardContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                euismod quis ligula vel rutrum. Integer sed ex aliquet mi
                bibendum convallis. Praesent fermentum ante in sapien posuere
                luctus. Sed sit amet nunc at ante hendrerit commodo in ac augue.
                Duis eu libero eget odio ornare aliquam.
              </CardContent>
              <CardFooter
                buttonColor={color}
                actions={cardFooterActions}
              ></CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
