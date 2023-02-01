const DOMINIO =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://habitss.vercel.app";

const PATH = {
  HOME: `${DOMINIO}`,
  EXPENSES: `${DOMINIO}/expenses`,
  FOOD: `${DOMINIO}/food`,
  LOGIN: `${DOMINIO}/login`,

  // API ENDPOINTS

  API: {
    EXPENSES: `${DOMINIO}/api/expenses`,
    FOOD: `${DOMINIO}/api/food`,
    USER: `${DOMINIO}/api/users`,
    LOGIN: `${DOMINIO}/api/users/login/login`,
  },
};
export default PATH;
