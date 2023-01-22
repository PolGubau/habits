const DOMINIO =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://askaquest.netlify.app";

const PATH = {
  HOME: `${DOMINIO}`,
  EXPENSES: `${DOMINIO}/expenses`,

  // API ENDPOINTS

  API: {
    EXPENSES: `${DOMINIO}/api/expenses`,
  },
};
export default PATH;
