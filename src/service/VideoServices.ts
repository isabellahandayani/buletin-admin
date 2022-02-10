let baseUrl = "http://localhost:8080";

export const getList = async () => {
  let res = await fetch(`${baseUrl}/video/list`, {
    method: "get",
  });
  
  return await res.json();
};

export const get = async (id: any) => {
  let res = await fetch(`${baseUrl}/video/${id}`, {
    method: "get",
  });

  return await res.json();
};
