const DOMINIO =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://askaquest.netlify.app";

const PATH = {
  HOME: `${DOMINIO}`,
  EXPENSES: `${DOMINIO}/expenses`,
  FOOD: `${DOMINIO}/food`,

  // API ENDPOINTS

  API: {
    EXPENSES: `${DOMINIO}/api/expenses`,
    FOOD: `${DOMINIO}/api/food`,
  },
};
export default PATH;
