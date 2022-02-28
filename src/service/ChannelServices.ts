let baseUrl = "http://localhost:8080";

export const getList = async (pageNo: number, pageSize: number, owner_id: number) => {
  let res = await fetch(
    `${baseUrl}/channel?page_no=${pageNo}&page_size=${pageSize}&owner_id=${owner_id}`,
    {
      method: "get",
    }
  );

  return await res.json();
};

export const get = async (id: any) => {
  let res = await fetch(`${baseUrl}/channel/${id}`, {
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
  let rest = await fetch(`${baseUrl}/channel/${channel_id}`, {
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
  let res = await fetch(`${baseUrl}/channel/${id}`, {
    method: "delete",
  });

  return await res.json();
};

export const create = async (
  owner_id: number,
  channel_name: String,
  channel_picture: String
) => {
  let res = await fetch(`${baseUrl}/channel`, {
    method: "post",
    body: JSON.stringify({
      owner_id: owner_id,
      channel_name: channel_name,
      channel_picture: channel_picture,
    }),
  });

  return await res.json();
};
