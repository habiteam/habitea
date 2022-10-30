import { faFaceAngry } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import React from 'react';
import Button from '../../common/components/Button/Button';
import Card from '../../common/components/Card/Card';
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

  return (
    <>
      <Head>
        <title>Habitea - Playground</title>
      </Head>

      <div>
        <h2>Outlined Buttons</h2>
        {colors.map((color, i) => (
          <Button key={i} fillType="outline" color={color}>
            Click this bad boi&nbsp;
            <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
          </Button>
        ))}
      </div>

      <div>
        <h2>Filled Buttons</h2>
        {colors.map((color, i) => (
          <Button key={i} fillType="filled" color={color}>
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
          <Link key={i} href="app" color={color}>
            Click this bad boi&nbsp;
            <FontAwesomeIcon icon={faFaceAngry}></FontAwesomeIcon>
          </Link>
        ))}
      </div>

      <h2>Cards</h2>
      <div
        style={{
          margin: '32px',
        }}
      >
        <Card maxWidth="360px">Content HERE!</Card>

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
              Content HERE!
            </Card>

            <Card maxWidth="360px" appearance="filled" color={color}>
              Content HERE!
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
