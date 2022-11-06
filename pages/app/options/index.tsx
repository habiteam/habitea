import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import Button from '../../../common/components/Button/Button';
import { getAppLayout } from '../../../components/AppLayout/AppLayout';
import themeAtom from '../../../common/atoms/theme';

export default function Options() {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <>
      <h2>Options</h2>
      <h3>Select theme</h3>
      <select
        name="theme"
        id=""
        value={theme}
        onChange={(e) => {
          localStorage.setItem('theme', e.target.value);
          setTheme(e.target.value);
        }}
      >
        <option value="habitea">Habit tea</option>
        <option value="coffee">Habit coffe</option>
        <option value="kale">Kale smoothie</option>
        <option value="mint">Spearmint</option>
        <option value="pinku">Bubblegum</option>
      </select>
    </>
  );
}

Options.getLayout = getAppLayout;
