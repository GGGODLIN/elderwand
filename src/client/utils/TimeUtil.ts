import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
// https://day.js.org/docs/en/plugin/custom-parse-format

dayjs("12-25-1995", "MM-DD-YYYY")
dayjs.extend(utc);
dayjs.extend(customParseFormat)

export class TimeUtil {
    static now(): dayjs.Dayjs {
        return dayjs();
    }

    static parse(time: string, format: string): dayjs.Dayjs {
        return dayjs(time);
    }
}
