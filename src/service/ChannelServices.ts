import { BASE_URL } from "../const";

export const getList = async (owner_id: number) => {
  let res = await fetch(
    `${BASE_URL}/channel?page_no=1&page_size=999&owner_id=${owner_id}`,
    {
      method: "get",
    }
  );

  return await res.json();
};

export const get = async (id: any) => {
  let res = await fetch(`${BASE_URL}/${id}`, {
    method: "get",
  });

  return await res.json();
};

export const update = async (
  owner_id: number,
  channel_name: string,
  channel_picture: string,
  channel_id: number
) => {
  let rest = await fetch(`${BASE_URL}/${channel_id}`, {
    method: "put",
    body: JSON.stringify({
      owner_id: owner_id,
      channel_name: channel_name,
      channel_picture: channel_picture,
    }),
  });

  return await rest.json();
};

export const deleteChannel = async (id: number) => {
  let res = await fetch(`${BASE_URL}/${id}`, {
    method: "delete",
  });

  return await res.json();
};

export const create = async (
  owner_id: number,
  channel_name: String,
  channel_picture: String
) => {
  let res = await fetch(`${BASE_URL}`, {
    method: "post",
    body: JSON.stringify({
      owner_id: owner_id,
      channel_name: channel_name,
      channel_picture: channel_picture,
    }),
  });

  return await res.json();
};
