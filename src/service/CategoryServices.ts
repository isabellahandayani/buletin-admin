let baseUrl = "http://localhost:8080";

export const getList = async () => {
  let res = await fetch(
    `${baseUrl}/category`,
    {
      method: "get",
    }
  );

  return await res.json();
};

export const get = async (id: any) => {
  let res = await fetch(`${baseUrl}/category/${id}`, {
    method: "get",
  });

  return await res.json();
};

export const update = async (
  category_name: string,
  category_picture: string,
  category_id: number
) => {
  let rest = await fetch(`${baseUrl}/category/${category_id}`, {
    method: "put",
    body: JSON.stringify({
      category_name: category_name,
      category_picture: category_picture,
    }),
  });

  return await rest.json();
};

export const deleteCategory = async (id: number) => {
  let res = await fetch(`${baseUrl}/category/${id}`, {
    method: "delete",
  });

  return await res.json();
};

export const create = async (
  category_name: string,
  category_picture: string
) => {
  let res = await fetch(`${baseUrl}/cateogory`, {
    method: "post",
    body: JSON.stringify({
      category_name: category_name,
	  category_picture: category_picture
    }),
  });

  return await res.json();
};
