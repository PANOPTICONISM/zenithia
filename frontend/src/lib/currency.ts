export const currency = () => {
  switch (navigator.language) {
    case "da":
      return "DKK";
    case "en-US":
      return "USD";
    case "en-GB":
      return "GBP";
    default:
      return "EUR";
  }
};

export const getCurrencyFromRegion = () => {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (timeZone.startsWith("America/")) {
      const americasCurrencies: Record<string, string> = {
        "America/Toronto": "CAD",
        "America/Vancouver": "CAD",
        "America/Mexico_City": "MXN",
        "America/Sao_Paulo": "BRL",
        "America/New_York": "USD"
      };

      return americasCurrencies[timeZone] || currency();
    }

    const timeZoneToCurrency: Record<string, string> = {
      "America/New_York": "USD",
      "Europe/London": "GBP",
      "Europe/Copenhagen": "DKK",
      "Europe/Berlin": "EUR",
      "Europe/Paris": "EUR"
    };

    return timeZoneToCurrency[timeZone] || currency();
  } catch {
    return currency();
  }
};

const decimalPlaces = {
  USD: 2,
  EUR: 2,
  GBP: 2,
  DKK: 2
};

export const valueFormatter = Intl.NumberFormat(navigator.language, {
  style: "currency",
  currency: getCurrencyFromRegion(),
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export const valueFormatterNoCurrency = Intl.NumberFormat(navigator.language, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export const currencyToCents = (
  amount: number | null,
  currencyCode: string
) => {
  if (amount === null || amount === undefined) {
    return null;
  }

  const code = currencyCode.toUpperCase();
  if (Object.prototype.hasOwnProperty.call(decimalPlaces, code)) {
    const multiplier = Math.pow(
      10,
      decimalPlaces[code as keyof typeof decimalPlaces]
    );

    const cents = amount * multiplier;
    return cents;
  } else {
    const multiplier = Math.pow(10, decimalPlaces.EUR);

    const cents = amount * multiplier;
    return cents;
  }
};

export const currencyFromCents = (cents: number) => {
  const targetCurrency = navigator.language.toUpperCase();

  if (Object.prototype.hasOwnProperty.call(decimalPlaces, targetCurrency)) {
    const multiplier = Math.pow(
      10,
      decimalPlaces[targetCurrency as keyof typeof decimalPlaces]
    );

    const realValue = cents / multiplier;
    return realValue;
  } else {
    const multiplier = Math.pow(10, decimalPlaces.EUR);

    const realValue = cents / multiplier;
    return realValue;
  }
};

export const currencyToLocale = (cents: number) => {
  const centsWithCurrency = currencyFromCents(cents);
  return valueFormatter.format(centsWithCurrency);
};
