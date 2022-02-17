let baseUrl = "http://localhost:8080";

export const login = async (email: string, pass: string) => {
  let res = await fetch(`${baseUrl}/login`, {
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
  phone_number: string,
) => {
  let res = await fetch(`${baseUrl}/user`, {
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
