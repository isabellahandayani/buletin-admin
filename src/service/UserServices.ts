import { BASE_URL } from "../const";

export const login = async (email: string, pass: string) => {
  let res = await fetch(`${BASE_URL}/login`, {
    method: "post",
    body: JSON.stringify({ email: email, password: pass }),
  });

  return await res.json();
};

export const register = async (
  email: string,
  password: string,
  username: string,
  name: string,
  phone_number: string
) => {
  let res = await fetch(`${BASE_URL}/user`, {
    method: "post",
    body: JSON.stringify({
      email: email,
      password: password,
      username: username,
      fullname: name,
      phone_number: phone_number,
      role: "admin",
    }),
  });

  return await res.json();
};
