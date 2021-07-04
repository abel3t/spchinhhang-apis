import { getUnixTime } from 'date-fns';

export const unixTime = (): number => getUnixTime(new Date());
