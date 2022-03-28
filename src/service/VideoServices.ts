import { BASE_URL } from "../const";

export const getAll = async () => {
  let res = await fetch(`${BASE_URL}/video?page_no=1&page_size=999`, {
    method: "get",
  });

  return await res.json();
};

export const getAllExcept = async (playlist_id: any) => {
  let res = await fetch(
    `${BASE_URL}/video?page_no=1&page_size=999&playlist_id_except=${playlist_id}`,
    {
      method: "get",
    }
  );

  return await res.json();
};

export const getVideoChannel = async (channel_id: any) => {
  let res = await fetch(
    `${BASE_URL}/video?page_no=1&page_size=999&channel_id=${channel_id}`,
    {
      method: "get",
    }
  );

  return await res.json();
};

export const getVideoPlaylist = async (playlist_id: any) => {
  let res = await fetch(
    `${BASE_URL}/video?page_no=1&page_size=999&playlist_id=${playlist_id}`,
    {
      method: "get",
    }
  );

  return await res.json();
};

export const getVideoAdmin = async (owner_id: any) => {
  let res = await fetch(
    `${BASE_URL}/video?page_no=1&page_size=999&owner_id=${owner_id}`,
    {
      method: "get",
    }
  );

  return await res.json();
};

export const get = async (id: any) => {
  let res = await fetch(`${BASE_URL}/video/${id}`, {
    method: "get",
  });

  return await res.json();
};

export const deleteVideo = async (id: number) => {
  let res = await fetch(`${BASE_URL}/video/${id}`, {
    method: "delete",
  });

  return await res.json();
};

export const create = async (
  video_title: String,
  video_desc: String,
  video_file_id: String,
  channel_id: Number,
  video_interest_id: any
) => {
  let interest = video_interest_id.join(", ")
  let res = await fetch(`${BASE_URL}/video`, {
    method: "post",
    body: JSON.stringify({
      video_title: video_title,
      video_desc: video_desc,
      video_file_id: video_file_id,
      channel_id: channel_id,
      video_interest_id: interest,
    }),
  });

  return await res.json();
};

export const update = async (
  video_title: String,
  video_desc: String,
  video_url: String,
  video_id: Number,
  video_interest_id: any
) => {
  let interest = video_interest_id.join(", ")
  let res = await fetch(`${BASE_URL}/video/${video_id}`, {
    method: "put",
    body: JSON.stringify({
      video_title: video_title,
      video_desc: video_desc,
      video_url: video_url,
      video_interest_id: interest,
    }),
  });

  return await res.json();
};
