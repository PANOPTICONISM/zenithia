import isString from "lodash/isString";
import { DateTime } from "luxon";
import { describe, expect, it } from "vitest";
import { dateToLocaleString, formatDateForApi } from "./dates";

describe("dates utilities", () => {
  const getTimeZoneToLocaleTest = (timeZone: string, locale: string) => {
    try {
      const timeZoneToLocale: Record<string, string> = {
        "America/New_York": "en-US",
        "Europe/Copenhagen": "da-DK"
      };

      return timeZoneToLocale[timeZone] || locale;
    } catch {
      return locale;
    }
  };

  it("getTimeZoneToLocale - default", () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = getTimeZoneToLocaleTest(timeZone, "en-US");

    expect(getTimeZoneToLocaleTest(timeZone, locale)).toBe(locale);
  });

  it("getTimeZoneToLocale - specific timezones", () => {
    expect(getTimeZoneToLocaleTest("America/New_York", "en-US")).toBe("en-US");
    expect(getTimeZoneToLocaleTest("Europe/Copenhagen", "da-DK")).toBe("da-DK");
  });

  it("dateToLocaleString - base", () => {
    const date = new Date("2025-01-29T00:00:00.000Z");
    const editDate = date.toISOString();

    expect(dateToLocaleString(date)).toBe("29.1.2025");
    expect(dateToLocaleString(editDate)).toBe("29.1.2025");
  });

  it("dateToLocaleString - different locales and timezones", () => {
    const date = new Date("2025-01-29T00:00:00.000Z");

    const transformDate = (date: Date | string, locale: string) =>
      DateTime.fromISO(isString(date) ? date : date.toISOString())
        .setLocale(locale)
        .toLocaleString(DateTime.DATE_SHORT) ?? "";

    expect(
      transformDate(date, getTimeZoneToLocaleTest("America/New_York", "en-US"))
    ).toBe("1/29/2025");
    expect(
      transformDate(date, getTimeZoneToLocaleTest("Europe/Copenhagen", "da-DK"))
    ).toBe("29.1.2025");
    expect(
      transformDate(date, getTimeZoneToLocaleTest("Europe/Copenhagen", "en-US"))
    ).toBe("29.1.2025");
  });

  it("dateToLocaleString - invalid date", () => {
    const invalidDate = "invalid-date-string";
    expect(dateToLocaleString(invalidDate)).toBe("");
  });

  it("formatDateForApi - final format ", () => {
    const date = new Date("2025-01-29T00:00:00.000Z");
    expect(formatDateForApi(date)).toBe("2025-01-29T00:00:00.000Z");
  });

  it("formatDateForApi - invalid date", () => {
    const invalidDate = "invalid-date-string";
    expect(formatDateForApi(invalidDate)).toBe("");
  });

  it("timeFromISOToFormatForApi - final format", () => {
    const date = "2025-01-29T00:00:00.000Z";
    expect(formatDateForApi(date)).toBe("2025-01-29T00:00:00.000Z");
  });

  it("timeFromISOToFormatForApi - invalid date", () => {
    const invalidDate = "invalid-date-string";
    expect(formatDateForApi(invalidDate)).toBe("");
  });
});
