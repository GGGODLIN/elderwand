import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export class TimeUtil {
    static now(): dayjs.Dayjs {
        return dayjs();
    }

    static new(time: any): dayjs.Dayjs {
        return dayjs(time);
    }
}
