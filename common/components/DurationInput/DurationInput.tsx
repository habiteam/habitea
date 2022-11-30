import { useState } from 'react';
import Input from '@commonComponents/Input/Input';
import { getSecondsFromDuration, toDurationString } from '@utils/duration';

export interface DurationInputPropsSchema
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  title: string;
  value?: string;
  id: string;
}

export default function DurationInput(props: DurationInputPropsSchema) {
  const [value, setValue] = useState<string>(props.value ?? '00:00:00');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function onBlur(event: any) {
    setValue(
      toDurationString(Math.max(0, getSecondsFromDuration(event.target.value))),
    );
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
