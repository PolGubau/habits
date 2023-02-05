export const currencies = [
  { label: "€", value: "EURO" },
  { label: "SEK", value: "SEK" },
  { label: "$", value: "DOLLAR" },
];
export const convertToEuro = (currency: string, price: number) => {
  switch (currency) {
    case "SEK":
      return Math.round(price * 0.089);
    case "DOLLAR":
      return Math.round(price * 0.92);
    case "Pound":
      return Math.round(price * 1.14);
    case "Yen":
      return Math.round(price * 0.0071);
    case "Yuan":
      return Math.round(price * 0.14);
    case "DKK":
      return Math.round(price * 0.13);
    case "NOK":
      return Math.round(price * 0.093);

    default:
      // euro or other
      return price;
  }
};
