import { Color } from '../../../constants/Color';

export interface CardHeaderPropSchema {
  title: string;
  image?: string;
  subTitle?: string;
  actions?: any[];
  actionsButtonColor?: Color;
}
