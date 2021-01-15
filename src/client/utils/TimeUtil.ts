import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(customParseFormat)
export class TimeUtil {
    static now(): dayjs.Dayjs {
        return dayjs();
    }

    static new(time: any): dayjs.Dayjs {
        return dayjs(time);
    }

    static parse(time: string, format: string): dayjs.Dayjs {
        return dayjs(time);
    }
}
