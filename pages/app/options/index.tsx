import { useAtom } from 'jotai';
import { getAppLayout } from '@components/AppLayout/AppLayout';
import themeAtom from '@atoms/theme';
import ThemeSelector from '@components/ThemeSelector/ThemeSelector';
import Head from 'next/head';
import Button from '@commonComponents/Button/Button';

export default function Options() {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <>
      <Head>
        <title>Options - Habitea</title>
      </Head>
      <h2>Options</h2>
      <ThemeSelector
        value={theme}
        onSelect={(value) => {
          localStorage.setItem('theme', value);
          setTheme(value);
        }}
      ></ThemeSelector>
      {/* Playground */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6,1fr)',
          gap: '8px',
          paddingBlock: '32px',
        }}
      >
        {[
          'success',
          'info',
          'warning',
          'danger',
          'primary',
          'tertiary',
          'default',
        ].map((color) =>
          ['regular', 'filled', 'outlined'].map((fillType) =>
            ['md', 'lg'].map((size) => (
              <Button
                key={`${color}-${fillType}-${size}`}
                fillType={fillType as any}
                size={size as any}
                color={color as any}
                text={`${color}-${fillType}-${size}`}
              ></Button>
            )),
          ),
        )}
      </div>
    </>
  );
}

Options.getLayout = getAppLayout;
