import isString from "lodash/isString";
import { DateTime } from "luxon";

export const currentDate = () => DateTime.now().toLocal().toISODate() || "";
export const currentTime = () =>
  DateTime.now().toUTC().toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") || "";

export const dateLuxonToISOForApi = (date: DateTime) => {
  const dateFormattedToISO = date.setZone("local").toISODate();
  return dateFormattedToISO ?? "";
};

export const dateFromISOToLocaleString = (date: Date | string) => {
  if (!isString(date)) {
    return DateTime.fromJSDate(date, { zone: "local" }).toLocaleString();
  }
  const formatToLuxonDateToISO = DateTime.fromISO(date, {
    zone: "local"
  }).toLocaleString();
  return formatToLuxonDateToISO ?? "";
};

export const dateFromJSDateToISOForApi = (date: Date | string) => {
  if (!isString(date)) {
    const formatDateToLuxonObj = DateTime.fromJSDate(date, { zone: "local" });
    return dateLuxonToISOForApi(formatDateToLuxonObj);
  }
  return dateLuxonToISOForApi(DateTime.fromISO(date, { zone: "local" }));
};

export const timeFromISOToFormatForApi = (date: string) => {
  const formattedTime = DateTime.fromISO(date, { zone: "local" })
    .toUTC()
    .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  return formattedTime ?? "";
};
