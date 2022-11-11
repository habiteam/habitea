import classNames from 'classnames';
import styles from './DatepickerSelect.module.scss';

export interface DatepickerSelectItem {
  value: string | number;
  label: string;
}

export interface DatepickerSelectPropSchema {
  list?: DatepickerSelectItem[];
  onSelect: (selectedValue: string | number) => void;
  selectedValue: string | number;
}

// TODO: styling
export function DatepickerSelect({
  list,
  onSelect,
  selectedValue,
}: DatepickerSelectPropSchema) {
  return (
    <div className={styles.list}>
      {list?.map((item, i) => (
        <button
          className={classNames(styles.item, {
            [styles['item--selected']]: item.value === selectedValue,
          })}
          key={i}
          onClick={() => onSelect(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
