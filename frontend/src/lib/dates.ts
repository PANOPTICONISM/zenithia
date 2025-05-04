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

export const currentDate = () => DateTime.now().toUTC().toISO() ?? "";

export const currentTime = () => DateTime.now().toUTC().toISO() ?? "";

export const dateToLocaleString = (date: Date | string) => {
  const dt = DateTime.fromISO(isString(date) ? date : date.toISOString());
  if (!dt.isValid) {
    return "";
  }
  return dt.setLocale(locale).toLocaleString(DateTime.DATE_SHORT);
};

export const formatDateForApi = (date: Date | string) =>
  DateTime.fromJSDate(isString(date) ? new Date(date) : date)
    .toUTC()
    .toISO() ?? "";

export const timeFromISOToFormatForApi = (date: string) =>
  DateTime.fromISO(date).toUTC().toISO() ?? "";
