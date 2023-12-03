import { isString } from "lodash";
import { DateTime } from "luxon";

export const currentDate = () => DateTime.now().toLocal().toISODate() || "";
export const currentTime = () =>
  DateTime.now().toLocal().toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS") || "";

export const dateLuxonToISOForApi = (date: DateTime) => {
  const dateFormattedToISO = date.toLocal().toISODate();
  if (dateFormattedToISO) {
    return dateFormattedToISO;
  }
  return "";
};

export const dateFromISOToLocaleString = (date: Date | string) => {
  if (!isString(date)) {
    return DateTime.fromJSDate(date).toLocaleString();
  }
  const formatToLuxonDateToISO = DateTime.fromISO(date).toLocaleString();
  if (formatToLuxonDateToISO) {
    return formatToLuxonDateToISO;
  }
  return "";
};

export const dateFromJSDateToISOForApi = (date: Date | string) => {
  if (!isString(date)) {
    const formatDateToLuxonObj = DateTime.fromJSDate(date);
    return dateLuxonToISOForApi(formatDateToLuxonObj);
  }
  return dateLuxonToISOForApi(DateTime.fromISO(date));
};

export const timeFromISOToFormatForApi = (date: string) => {
  const formattedTime = DateTime.fromISO(date).toFormat(
    "yyyy-MM-dd'T'HH:mm:ss.SSS",
  );
  if (formattedTime) {
    return formattedTime;
  }
  return "";
};
