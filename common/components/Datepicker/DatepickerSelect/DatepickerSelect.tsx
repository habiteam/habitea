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
    <div>
      {list?.map((item, i) => (
        <button key={i} onClick={() => onSelect(item.value)}>
          {item.label}
        </button>
      ))}
    </div>
  );
}
