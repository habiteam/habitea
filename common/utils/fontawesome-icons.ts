import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

export const initIcons = (): void => {
  config.autoAddCss = false;
  library.add(fas);
};
