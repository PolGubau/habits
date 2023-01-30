export const currencies = [
  { label: "€", value: "Euro" },
  { label: "SEK", value: "Sek" },
  { label: "$", value: "Dollar" },
];
export const convertToEuro = (currency: string, price: number) => {
  switch (currency) {
    case "Sek":
      return price * 0.089;
    case "Dollar":
      return price * 0.92;
    case "Pound":
      return price * 1.14;
    case "Yen":
      return price * 0.0071;
    case "Yuan":
      return price * 0.14;
    case "DKK":
      return price * 0.13;
    case "NOK":
      return price * 0.093;

    default:
      return price;
  }
};
