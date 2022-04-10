import { BASE_URL } from "../const";

export const get = async () => {
  let res = await fetch(`${BASE_URL}/interest`);
  return res.json();
};

export const create = async (name: any) => {
  let res = await fetch(`${BASE_URL}/interest`, {
    method: "POST",
    body: JSON.stringify({
      interest_name: name,
    }),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

export const update = async (id: any, name: any) => {
  let res = await fetch(`${BASE_URL}/interest/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      interest_name: name,
    }),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

export const deleteInterest = async (id: any) => {
  let res = await fetch(`${BASE_URL}/interest/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};
