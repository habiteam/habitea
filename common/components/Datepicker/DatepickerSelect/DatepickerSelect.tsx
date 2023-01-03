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

export function DatepickerSelect({
  list,
  onSelect,
  selectedValue,
}: DatepickerSelectPropSchema) {
  setTimeout(() => {
    document.getElementById(selectedValue.toLocaleString())?.scrollIntoView();
  }, 0);

  return (
    <div className={styles.list}>
      {list?.map((item, i) => (
        <button
          className={classNames(styles.item, {
            [styles['item--selected']]: item.value === selectedValue,
          })}
          id={item.value.toLocaleString()}
          key={i}
          onClick={(event) => {
            event.preventDefault();
            onSelect(item.value);
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
