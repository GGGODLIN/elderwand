import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export class TimeUtil {
    static now(): dayjs.Dayjs {
        return dayjs();
    }
}
