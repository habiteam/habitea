import classNames from 'classnames';
import { THEMES } from '@constants/palette';
import Block from '@commonComponents/Block/Block';
import styles from './ThemeSelector.module.scss';

export interface ThemeSelectorPropsSchema {
  value: string;
  onSelect: (theme: string) => void;
}

export default function ThemeSelector({
  value,
  onSelect,
}: ThemeSelectorPropsSchema) {
  return (
    <Block header="Theme">
      <div className={styles.themes}>
        {THEMES.map((theme, index) => (
          <div
            className={styles.theme}
            key={index}
            onClick={() => onSelect(theme.value)}
          >
            <div
              style={{
                background: `linear-gradient(140deg, ${theme.primary} 0%, ${theme.primary} 49%, ${theme.secondary} 50%, ${theme.secondary} 100%`,
              }}
              className={classNames(styles.box, {
                [styles['box--active']]: value === theme.value,
              })}
            ></div>
            {theme.name}
          </div>
        ))}
      </div>
    </Block>
  );
}
