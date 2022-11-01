import Head from 'next/head';
import { useState } from 'react';

import Card, { CardAppearance } from '../../../common/components/Card/Card';
import CardContent from '../../../common/components/Card/CardContent/CardContent';
import CardFooter, {
  CardFooterActionsSchema,
} from '../../../common/components/Card/CardFooter/CardFooter';
import CardHeader from '../../../common/components/Card/CardHeader/CardHeader';
import CardMedia from '../../../common/components/Card/CardMedia/CardMedia';
import { Color } from '../../../common/constants/Color';

export default function Playground() {
  const [form, setForm] = useState({
    cardWidth: 300,
    cardTitle: 'Title',
    cardSubtitle: '',
    cardContent: '',
    cardAppearance: 'outlined',
    cardColor: 'default',

    buttonsColor: 'default',

    hasAvatar: true,
    hasHeaderActions: true,
    hasMedia: true,
    hasContent: true,
    hasActions: true,
  });

  const handleChange = (event: any) => {
    const { name } = event.target;

    if (event.target.type === 'checkbox') {
      setForm((values: any) => ({ ...values, [name]: event.target.checked }));
    } else {
      setForm((values: any) => ({ ...values, [name]: event.target.value }));
    }
  };

  const appearances: CardAppearance[] = ['outlined', 'filled', 'elevated'];

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
            maxWidth={`${form.cardWidth}px`}
            color={form.cardColor as Color}
            appearance={form.cardAppearance as CardAppearance}
          >
            <CardHeader
              title={form.cardTitle}
              subTitle={form.cardSubtitle}
              image={form.hasAvatar ? '/cat.jpg' : undefined}
              actions={form.hasHeaderActions ? [] : undefined}
            ></CardHeader>

            {form.hasMedia && (
              <CardMedia image="/dog.jpg" alt="cat image"></CardMedia>
            )}

            {form.hasContent && <CardContent>{form.cardContent}</CardContent>}

            {form.hasActions && (
              <CardFooter
                buttonColor={form.buttonsColor as Color}
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
              type="number"
              name="cardWidth"
              value={form.cardWidth}
              onChange={handleChange}
            ></input>

            <label>Title: </label>
            <input
              type="text"
              name="cardTitle"
              value={form.cardTitle}
              onChange={handleChange}
            ></input>

            <label>Subtitle: </label>
            <input
              type="text"
              name="cardSubtitle"
              value={form.cardSubtitle}
              onChange={handleChange}
            ></input>

            <label>Content: </label>
            <textarea
              name="cardContent"
              value={form.cardContent}
              onChange={handleChange}
            ></textarea>

            <label>Appearance: </label>
            <select
              name="cardAppearance"
              value={form.cardAppearance}
              onChange={handleChange}
            >
              {appearances.map((appearance, i) => (
                <option key={i} value={appearance}>
                  {appearance}
                </option>
              ))}
            </select>

            <label>Color: </label>
            <select
              name="cardColor"
              value={form.cardColor}
              onChange={handleChange}
            >
              {colors.map((color, i) => (
                <option key={i} value={color}>
                  {color}
                </option>
              ))}
            </select>

            <label>Buttons color: </label>
            <select
              name="buttonsColor"
              value={form.buttonsColor}
              onChange={handleChange}
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
                id="hasAvatar"
                name="hasAvatar"
                checked={form.hasAvatar}
                onChange={handleChange}
              ></input>
              <label>Avatar</label>

              <input
                type="checkbox"
                id="hasHeaderActions"
                name="hasHeaderActions"
                checked={form.hasHeaderActions}
                onChange={handleChange}
              ></input>
              <label>Header Actions</label>

              <input
                type="checkbox"
                id="hasMedia"
                name="hasMedia"
                checked={form.hasMedia}
                onChange={handleChange}
              ></input>
              <label>Media</label>

              <input
                type="checkbox"
                id="hasContent"
                name="hasContent"
                checked={form.hasContent}
                onChange={handleChange}
              ></input>
              <label>Content</label>

              <input
                type="checkbox"
                id="hasActions"
                name="hasActions"
                checked={form.hasActions}
                onChange={handleChange}
              ></input>
              <label>Actions</label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
