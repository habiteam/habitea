import { useAtom } from 'jotai';
import { getAppLayout } from '../../../components/AppLayout/AppLayout';
import themeAtom from '../../../common/atoms/theme';
import ThemeSelector from '../../../components/ThemeSelector/ThemeSelector';

export default function Options() {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <>
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
