let baseUrl = "http://localhost:8080";

export const getList = async (pageNo: number, pageSize: number) => {
  let res = await fetch(`${baseUrl}/video?page_no=${pageNo}&page_size=${pageSize}`, {
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
