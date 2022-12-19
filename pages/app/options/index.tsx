import { useAtom } from 'jotai';
import { getAppLayout } from '@components/AppLayout/AppLayout';
import themeAtom from '@atoms/theme';
import ThemeSelector from '@components/ThemeSelector/ThemeSelector';
import Head from 'next/head';

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
    </>
  );
}

Options.getLayout = getAppLayout;
