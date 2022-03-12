const BASE_URL = "http://localhost:8080";

export const getList = async () => {
  let res = await fetch(`${BASE_URL}/playlist`, {
    method: "GET",
  });

  return await res.json();
};

export const get = async (id: any) => {
  let res = await fetch(`${BASE_URL}/playlist/${id}`, {
    method: "GET",
  });

  return await res.json();
};

export const update = async (
  playlist_id: any,
  playlist_name: any,
  category_id: any
) => {
  let res = await fetch(`${BASE_URL}/playlist/${playlist_id}`, {
    method: "PUT",
    body: JSON.stringify({
      category_id: category_id,
      playlist_name: playlist_name,
    }),
  });

  return await res.json();
};

export const deleteList = async (id: any) => {
  let res = await fetch(`${BASE_URL}/playlist/${id}`, {
    method: "DELETE",
  });

  return await res.json();
};

export const create = async (id: any, name: any) => {
  let res = await fetch(`${BASE_URL}/playlist`, {
    method: "POST",
    body: JSON.stringify({
      category_id: id,
      playlist_name: name,
    }),
  });

  return await res.json();
};
