let baseUrl = "http://localhost:8080";

export const getVideoChannel = async (pageNo: number, pageSize: number, channel_id: any) => {
  let res = await fetch(
    `${baseUrl}/video?page_no=${pageNo}&page_size=${pageSize}&channel_id=${channel_id}`,
    {
      method: "get",
    }
  );

  return await res.json();
};

export const get = async (id: any) => {
  let res = await fetch(`${baseUrl}/video/${id}`, {
    method: "get",
  });

  return await res.json();
};

export const deleteVideo = async (id: number) => {
  let res = await fetch(`${baseUrl}/video/${id}`, {
    method: "delete",
  });

  return await res.json();
};

export const create = async (
  video_title: String,
  video_desc: String,
  video_url: String,
  channel_id: Number
) => {
  let res = await fetch(`${baseUrl}/video`, {
    method: "post",
    body: JSON.stringify({
      video_title: video_title,
      video_desc: video_desc,
      video_url: video_url,
      channel_id: channel_id,
    }),
  });

  return await res.json();
};

export const update = async (
  video_title: String,
  video_desc: String,
  video_url: String,
  video_id: Number
) => {
  let res = await fetch(`${baseUrl}/video/${video_id}`, {
    method: "put",
    body: JSON.stringify({
      video_title: video_title,
      video_desc: video_desc,
      video_url: video_url,
    }),
  });

  return await res.json();
};
