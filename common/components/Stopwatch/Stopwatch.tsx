import Button from '@commonComponents/Button/Button';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSecondsFromDuration, toDurationString } from '@utils/duration';
import classNames from 'classnames';
import { useState } from 'react';
import styles from './Stopwatch.module.scss';

export type StopwatchState = 'PAUSED' | 'PLAYING';

export interface StopwatchPropsSchema {
  value: string;
  onChange: (duration: string) => void;
}

export default function Stopwatch({ value, onChange }: StopwatchPropsSchema) {
  const [stopwatchState, setStopwatchState] =
    useState<StopwatchState>('PAUSED');

  const [duration, setDuration] = useState<number>(
    getSecondsFromDuration(value),
  );

  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  function controlStopwatch(): void {
    if (stopwatchState !== 'PLAYING') {
      setStopwatchState('PLAYING');

      const intId = setInterval(() => {
        setDuration((prevValue) => prevValue + 1);
      }, 1000);

      setIntervalId(intId);
    } else {
      setStopwatchState('PAUSED');

      clearInterval(intervalId);

      onChange(toDurationString(duration));
    }
  }

  function reset(): void {
    setStopwatchState('PAUSED');

    clearInterval(intervalId);

    setDuration(0);

    onChange(toDurationString(0));
  }

  return (
    <div className={classNames(styles.container)}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span className={classNames(styles.duration)}>
          {toDurationString(duration)}
        </span>
      </div>

      <div>
        <Button
          fillType="filled"
          onClick={() => controlStopwatch()}
          color={stopwatchState !== 'PLAYING' ? 'primary-alt' : 'primary'}
          style={{ marginRight: '16px' }}
        >
          {stopwatchState !== 'PLAYING' && (
            <FontAwesomeIcon icon={faPlay} width={64}></FontAwesomeIcon>
          )}
          {stopwatchState === 'PLAYING' && (
            <FontAwesomeIcon icon={faPause} width={64}></FontAwesomeIcon>
          )}
        </Button>
        <Button fillType="filled" onClick={() => reset()} color="tertiary">
          Reset
        </Button>
      </div>
    </div>
  );
}
