import { Activity } from '@schemas/activity';

export interface DailyActivity extends Activity {
  progress?: number;
}
