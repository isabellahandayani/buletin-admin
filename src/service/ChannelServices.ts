let baseUrl = "http://localhost:8080";

export const getList = async (pageNo: number, pageSize: number) => {
  let res = await fetch(
    `${baseUrl}/channel?page_no=${pageNo}&page_size=${pageSize}`,
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
  category_id: number,
  channel_name: string,
  channel_picture: string
) => {
  let rest = await fetch(`${baseUrl}/channel`, {
    method: "put",
    body: JSON.stringify({
      owner_id: owner_id,
      category_id: category_id,
      channel_name: channel_name,
      channel_picture: channel_picture,
    }),
  });

  return await rest.json();
};
