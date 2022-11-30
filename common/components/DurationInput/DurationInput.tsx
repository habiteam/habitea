/* eslint-disable no-restricted-globals */
import { useState } from 'react';
import Input from '@commonComponents/Input/Input';

export interface DurationInputPropsSchema
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  title: string;
  value?: string;
  id: string;
}

function getSeconds(value: string): number {
  const [hours, minutes, seconds] = value.split(':').map(Number);

  if (!isNaN(hours) && isNaN(minutes) && isNaN(seconds)) {
    return hours;
  }

  if (!isNaN(hours) && !isNaN(minutes) && isNaN(seconds)) {
    return hours * 60 + minutes;
  }

  if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
    return hours * 60 * 60 + minutes * 60 + seconds;
  }

  return 0;
}

function toHHMMSSFormat(value: number): string {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor(value / 60) % 60;
  const seconds = value % 60;

  return [hours, minutes, seconds]
    .map((element) => element.toString().padStart(2, '0'))
    .join(':');
}

export default function DurationInput(props: DurationInputPropsSchema) {
  const [value, setValue] = useState<string>('00:00:00');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function onBlur(event: any) {
    setValue(toHHMMSSFormat(Math.max(0, getSeconds(event.target.value))));
  }

  return (
    <Input
      id={props.id}
      title={props.title}
      name={props.name}
      style={props.style}
      value={value}
      onChange={handleChange}
      onBlur={(event) => {
        onBlur(event);
        if (props.onChange) {
          props.onChange(event);
        }
      }}
    ></Input>
  );
}
