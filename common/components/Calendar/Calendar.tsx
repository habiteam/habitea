import { Months } from '@constants/dictionaries';
import { Activity } from '@schemas/activity';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import userAtom from '@atoms/user';
import { ActivitiesService } from '@services/activities';
import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getNextMonth,
  getPreviousMonth,
} from '@utils/date';
import classNames from 'classnames';
import styles from './Calendar.module.scss';

export interface CalendarProps {
  date: Date;
}

export default function Calendar(props: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(props.date);
  const user = useAtomValue(userAtom);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const fetchedActivities = await ActivitiesService.getForMonth(
          currentDate,
          user?.uid,
        );
        setActivities(fetchedActivities);
      };
      fetchData();
    }
  }, [currentDate]);
  const loadPreviousMonth = () => {
    setCurrentDate(getPreviousMonth(currentDate));
  };
  const loadNextMonth = () => {
    setCurrentDate(getNextMonth(currentDate));
  };

  const emptyDays = [];
  const firstDayIndex = (getFirstDayOfMonth(currentDate).getDay() || 7) - 1;
  for (let i = 0; i < firstDayIndex; i += 1) {
    emptyDays.push(
      <div
        key={i}
        className={classNames(styles.days__day, styles['days__day--inactive'])}
      ></div>,
    );
  }

  const days = [];
  const lastDayIndex = getLastDayOfMonth(currentDate).getDate();
  for (let i = 1; i <= lastDayIndex; i += 1) {
    days.push(
      <div key={i} className={styles.days__day}>
        {i}🚀️
      </div>,
    );
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <div>
          {Months[currentDate.getMonth()]}&nbsp;
          {currentDate.getFullYear()}
        </div>
        <div className={styles.header__controls}>
          <button
            onClick={loadPreviousMonth}
            className={styles.header__control}
          >
            &lt;
          </button>
          <button onClick={loadNextMonth} className={styles.header__control}>
            &gt;
          </button>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.weekdays}>
          <div className={styles.weekdays__day}>Mon</div>
          <div className={styles.weekdays__day}>Tue</div>
          <div className={styles.weekdays__day}>Wed</div>
          <div className={styles.weekdays__day}>Thu</div>
          <div className={styles.weekdays__day}>Fri</div>
          <div className={styles.weekdays__day}>Sat</div>
          <div className={styles.weekdays__day}>Sun</div>
        </div>
        <div className={styles.days}>
          {emptyDays.map((day) => day)}
          {days.map((day) => day)}
        </div>
      </div>
    </div>
  );
}
