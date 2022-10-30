import { Color } from '../../../constants/Color';
import { ButtonPropSchema } from '../../Button/Button.schema';

export interface CardFooterActionsSchema
  extends Omit<ButtonPropSchema, 'children'> {
  text: string;
}

export interface CardFooterPropSchema {
  buttonColor?: Color;
  actions: CardFooterActionsSchema[];
}
