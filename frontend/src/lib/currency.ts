const currency = () => {
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

export const valueFormatter = Intl.NumberFormat(navigator.language, {
  style: "currency",
  currency: currency(),
});
