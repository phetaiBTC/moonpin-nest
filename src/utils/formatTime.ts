import * as dayjs from 'dayjs';

export const formatTime = (valuse: Date) => {
    return dayjs(valuse).format('DD-MM-YYYY HH:mm');
}