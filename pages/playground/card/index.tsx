import Head from 'next/head';
import React, { useState } from 'react';

import Card, { CardAppearance } from '../../../common/components/Card/Card';
import CardContent from '../../../common/components/Card/CardContent/CardContent';
import CardFooter, {
  CardFooterActionsSchema,
} from '../../../common/components/Card/CardFooter/CardFooter';
import CardHeader from '../../../common/components/Card/CardHeader/CardHeader';
import CardMedia from '../../../common/components/Card/CardMedia/CardMedia';
import { Color } from '../../../common/constants/Color';

export default function Playground() {
  const [cardWidth, setCardWidth] = useState<number>(360);
  const [cardContent, setCardContent] = useState<string>(
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod quis ligula vel rutrum. Integer sed ex aliquet mi bibendum convallis. Praesent fermentum ante in sapien posuere luctus. Sed sit amet nunc at ante hendrerit commodo in ac augue.Duis eu libero eget odio ornare aliquam.',
  );
  const [cardColor, setCardColor] = useState<Color>('danger');
  const [cardAppearance, setCardAppearance] =
    useState<CardAppearance>('elevated');

  const [hasMedia, setHasMedia] = useState<boolean>(true);
  const [hasContent, setHasContent] = useState<boolean>(true);
  const [hasActions, setHasActions] = useState<boolean>(true);

  const appearances: CardAppearance[] = ['filled', 'outlined', 'elevated'];

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
        <title>Habitea - Playground - Card</title>
      </Head>
      <div
        style={{
          display: 'flex',
          margin: '24px',
          padding: '24px',
          gap: '24px',
        }}
      >
        <div style={{ flex: 4 }}>
          {' '}
          <Card
            maxWidth={`${cardWidth}px`}
            color={cardColor}
            appearance={cardAppearance}
          >
            <CardHeader
              title="Title"
              subTitle="12.12.2012"
              image="/cat.jpg"
              actions={[]}
            ></CardHeader>

            {hasMedia && (
              <CardMedia image="/dog.jpg" alt="cat image"></CardMedia>
            )}

            {hasContent && <CardContent>{cardContent}</CardContent>}

            {hasActions && (
              <CardFooter
                buttonColor={cardColor}
                actions={cardFooterActions}
              ></CardFooter>
            )}
          </Card>
        </div>
        <div
          style={{ flex: 5, padding: '24px', borderLeft: '1px solid black' }}
        >
          <h1>Options: </h1>
          <form style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Width (px): </label>
            <input
              value={cardWidth}
              onChange={(e) => setCardWidth(parseInt(e.target.value))}
            ></input>

            <label>Content: </label>
            <textarea
              value={cardContent}
              onChange={(e) => setCardContent(e.target.value)}
            ></textarea>

            <label>Appearance: </label>
            <select
              value={cardAppearance}
              onChange={(e) =>
                setCardAppearance(e.target.value as CardAppearance)
              }
            >
              {appearances.map((appearance, i) => (
                <option key={i} value={appearance}>
                  {appearance}
                </option>
              ))}
            </select>
            <label>Color: </label>
            <select
              value={cardColor}
              onChange={(e) => setCardColor(e.target.value as Color)}
            >
              {colors.map((color, i) => (
                <option key={i} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <div>
              <input
                type="checkbox"
                id="hasMedia"
                name="Media"
                checked={hasMedia}
                onChange={() => setHasMedia(!hasMedia)}
              ></input>
              <label>Media</label>

              <input
                type="checkbox"
                id="hasContent"
                name="Content"
                checked={hasContent}
                onChange={() => setHasContent(!hasContent)}
              ></input>
              <label>Content</label>

              <input
                type="checkbox"
                id="hasActions"
                name="Actions"
                checked={hasActions}
                onChange={() => setHasActions(!hasActions)}
              ></input>
              <label>Actions</label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
