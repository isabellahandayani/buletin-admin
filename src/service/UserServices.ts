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

export const get = async () => {
  let res = await fetch(`${BASE_URL}/profile`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return await res.json();
};

export const change = async (
  email: any,
  old_password: any,
  new_password: any
) => {
  let res = await fetch(`${BASE_URL}/user`, {
    method: "put",
    body: JSON.stringify({
      email: email,
      old_password: old_password,
      new_password: new_password,
    }),
  });

  return await res.json();
};

export const forget = async (email: any) => {
  let res = await fetch(`${BASE_URL}/forget`, {
    method: "post",
    body: JSON.stringify({ email: email }),
  });

  return await res.json();
};
