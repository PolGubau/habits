import axios from "axios";
import PATH from "src/utils/path";
export const USER_CODES = {
  CREATED_SUCCESSFULLY: "created successfully",
  USERNAME_TAKEN: "usernameTaken",
  USER_NOT_FOUND: "userNotFound",
  WRONG_PASSWORD: "wrongPassword",
  LOGED_IN: "logedIn",
  ERROR: "error",
};

export const getAllUsers = async () => {
  const { data } = await axios.get(PATH.API.USER);
  return data;
};

//

export const isThisUsernameTaken = async (username: string) => {
  const users = await getAllUsers();
  const usernames = users.map((user: any) => user.username);
  return usernames.includes(username);
};
export const manageCreateAccount = async (values: any) => {
  const { CREATED_SUCCESSFULLY, USERNAME_TAKEN } = USER_CODES;
  const { username, email, password } = values;
  const isUsernameTaken = await isThisUsernameTaken(username);
  if (isUsernameTaken) {
    return USERNAME_TAKEN;
  } else {
    await axios.post(PATH.API.USER, {
      username,
      email,
      password,
    });
    return CREATED_SUCCESSFULLY;
  }
};

//

export const manageDeleteAccount = async (id: string) => {
  await axios.delete(`${PATH.API.USER}/${id}`);
};

//

export const manageUpdateAccount = async (id: string, values: any) => {
  const { data } = await axios.put(`${PATH.API.USER}/${id}`, values);
  console.log(data);
};

//

export const manageGetAccount = async (id: string) => {
  const { data } = await axios.get(`${PATH.API.USER}/${id}`);
  console.log(data);
};

//

export const login = async (values: any) => {
  const { username, password } = values;
  const { data } = await axios.get(PATH.API.LOGIN, {
    params: { username, password },
  });
  if (data.error === USER_CODES.USER_NOT_FOUND)
    return USER_CODES.USER_NOT_FOUND;

  if (data === USER_CODES.WRONG_PASSWORD) return USER_CODES.WRONG_PASSWORD;

  if (data.success && data.data) {
    localStorage.setItem("user", JSON.stringify(data.data));
    if (localStorage.getItem("user")) return USER_CODES.LOGED_IN;
  }
  return USER_CODES.ERROR;
};
