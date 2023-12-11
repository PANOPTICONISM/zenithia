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

const decimalPlaces = {
  USD: 2,
  EUR: 2,
  GBP: 2,
  DA: 2,
};

export const valueFormatter = Intl.NumberFormat(navigator.language, {
  style: "currency",
  currency: currency(),
});

export const currencyToCents = (
  amount: number | null,
  currencyCode: string,
) => {
  if (!amount) {
    return null;
  }

  const code = currencyCode.toUpperCase();
  if (Object.prototype.hasOwnProperty.call(decimalPlaces, code)) {
    const multiplier = Math.pow(
      10,
      decimalPlaces[code as keyof typeof decimalPlaces],
    );

    const cents = Math.round(amount * multiplier);
    return cents;
  } else {
    throw new Error("Invalid currency code.");
  }
};

export const currencyToLocale = (cents: number) => {
  const targetCurrency = navigator.language.toUpperCase();

  if (Object.prototype.hasOwnProperty.call(decimalPlaces, targetCurrency)) {
    const multiplier = Math.pow(
      10,
      decimalPlaces[targetCurrency as keyof typeof decimalPlaces],
    );

    const realValue = cents / multiplier;
    return valueFormatter.format(realValue);
  } else {
    throw new Error("Invalid currency code.");
  }
};
