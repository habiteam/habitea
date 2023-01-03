export interface DatepickerCalendarViewSchema {
  month: number;
  year: number;
}

export interface DatepickerCalendarSelectedDateSchema
  extends DatepickerCalendarViewSchema {
  day: number;
}
