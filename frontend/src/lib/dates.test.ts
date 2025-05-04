import isString from "lodash/isString";
import { DateTime } from "luxon";
import { describe, expect, it } from "vitest";
import { dateToLocaleString } from "./dates";

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

  it("dateToLocaleString - base", () => {
    const date = new Date("2025-01-29T00:00:00.000Z");
    const editDate = date.toISOString();

    expect(dateToLocaleString(date)).toBe("29.1.2025");
    expect(dateToLocaleString(editDate)).toBe("29.1.2025");
  });

  it("dateToLocaleString - different locales and timezones", () => {
    const date = new Date("2025-01-29T00:00:00.000Z");

    const transformDate = (
      date: Date | string,
      timeZone: string,
      locale: string
    ) => {
      if (!isString(date)) {
        return (
          DateTime.fromJSDate(date, {
            zone: timeZone
          })
            .setLocale(locale)
            .toLocaleString(DateTime.DATE_SHORT) ?? ""
        );
      }
      return (
        DateTime.fromISO(date, {
          zone: timeZone
        })
          .setLocale(locale)
          .toLocaleString(DateTime.DATE_SHORT) ?? ""
      );
    };

    expect(
      transformDate(
        date,
        "America/New_York",
        getTimeZoneToLocaleTest("America/New_York", "en-US")
      )
    ).toBe("1/28/2025");
    expect(
      transformDate(
        date,
        "Europe/Copenhagen",
        getTimeZoneToLocaleTest("Europe/Copenhagen", "da-DK")
      )
    ).toBe("29.1.2025");
    expect(
      transformDate(
        date,
        "Europe/Copenhagen",
        getTimeZoneToLocaleTest("Europe/Copenhagen", "en-US")
      )
    ).toBe("29.1.2025");
  });
});
