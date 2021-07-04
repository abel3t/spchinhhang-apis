import { getUnixTime } from 'date-fns';
import { ObjectID } from 'mongodb';

export const unixTime = (): number => getUnixTime(new Date());

export const toObjectId = (value: string): ObjectID => ObjectID(value);
