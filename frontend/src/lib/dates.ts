import isString from "lodash/isString";
import { DateTime } from "luxon";

export const getTimeZoneToLocale = () => {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const timeZoneToLocale: Record<string, string> = {
      "America/New_York": "en-US",
      "America/Toronto": "en-CA",
      "America/Vancouver": "en-CA",
      "America/Mexico_City": "es-MX",
      "America/Sao_Paulo": "pt-BR",
      "Europe/London": "en-GB",
      "Europe/Copenhagen": "da-DK",
      "Europe/Berlin": "de-DE",
      "Europe/Paris": "fr-FR",
      "Europe/Amsterdam": "nl-NL",
      "Asia/Tokyo": "ja-JP",
      "Asia/Shanghai": "zh-CN",
      "Asia/Hong_Kong": "zh-HK",
      "Australia/Sydney": "en-AU"
    };

    return (
      timeZoneToLocale[timeZone] ||
      Intl.DateTimeFormat().resolvedOptions().locale
    );
  } catch {
    return Intl.DateTimeFormat().resolvedOptions().locale;
  }
};

const locale = getTimeZoneToLocale();
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const currentDate = () => DateTime.now().toLocal().toISODate() || "";
export const currentTime = () =>
  DateTime.now().toUTC().toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") || "";

export const dateLuxonToISOForApi = (date: DateTime) => {
  const dateFormattedToISO = date.setZone(timeZone).toISODate();
  return dateFormattedToISO ?? "";
};

export const dateFromISOToLocaleString = (date: Date | string) => {
  if (!isString(date)) {
    return DateTime.fromJSDate(date, {
      zone: timeZone
    }).setLocale(locale);
  }
  const formatToLuxonDateToISO = DateTime.fromISO(date, {
    zone: timeZone
  }).setLocale(locale);
  return formatToLuxonDateToISO.toLocaleString(DateTime.DATE_SHORT) ?? "";
};

export const dateFromJSDateToISOForApi = (date: Date | string) => {
  if (!isString(date)) {
    const formatDateToLuxonObj = DateTime.fromJSDate(date, { zone: timeZone });
    return dateLuxonToISOForApi(formatDateToLuxonObj);
  }
  return dateLuxonToISOForApi(DateTime.fromISO(date, { zone: timeZone }));
};

export const timeFromISOToFormatForApi = (date: string) => {
  const formattedTime = DateTime.fromISO(date, { zone: timeZone })
    .toUTC()
    .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  return formattedTime ?? "";
};
