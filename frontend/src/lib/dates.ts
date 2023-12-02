import { DateTime } from "luxon";

export const dateLuxonToISO = (date: DateTime) => {
  const dateFormattedToISO = date.toLocal().toISODate();
  if (dateFormattedToISO) {
    return dateFormattedToISO;
  }
  return date;
};
