export const currencies = [
  { label: "€", value: "EURO" },
  { label: "SEK", value: "SEK" },
];
export const convertToEuro = (currency: string, price: number) => {
  switch (currency) {
    case "SEK":
      const converted = price * 0.088;
      return Math.round((converted + Number.EPSILON) * 100) / 100;

    default:
      // euro or other
      return Math.round((price + Number.EPSILON) * 100) / 100;
  }
};
