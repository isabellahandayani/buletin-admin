import { BASE_URL } from "../const";

export const getAll = async () => {
  let arr: any[] = [];

  let i = 1;
  while(true) {
    let res = await fetch(`${BASE_URL}/video?page_no=${i}&page_size=20`, {
      method: "get",
    });

    i++;
    let { data } = await res.json();
    if(!data.videos) break;
    arr = arr.concat(data.videos);
  }

  return arr
};

export const getAllExcept = async (playlist_id: any) => {
  let arr: any[] = [];

  let i = 1;
  while(true) {
    let res = await fetch(`${BASE_URL}/video?page_no=${i}&page_size=20&playlist_id_except=${playlist_id}`, {
      method: "get",
    });

    i++;
    let { data } = await res.json();
    if(!data.videos) break;
    arr = arr.concat(data.videos);
  }

  return arr;
};

export const getVideoChannel = async (channel_id: any) => {
  let arr: any[] = [];

  let i = 1;
  while(true) {
    let res = await fetch(`${BASE_URL}/video?page_no=${i}&page_size=20&channel_id=${channel_id}`, {
      method: "get",
    });

    i++;
    let { data } = await res.json();
    if(!data.videos) break;
    arr = arr.concat(data.videos);
  }

  return arr;
};

export const getVideoPlaylist = async (playlist_id: any) => {
  let arr: any[] = [];

  let i = 1;
  while(true) {
    let res = await fetch(`${BASE_URL}/video?page_no=${i}&page_size=20&playlist_id=${playlist_id}`, {
      method: "get",
    });

    i++;
    let { data } = await res.json();
    if(!data.videos) break;
    arr = arr.concat(data.videos);
  }

  return arr;
};

export const getVideoAdmin = async (owner_id: any) => {
  let arr: any[] = [];

  let i = 1;
  while(true) {
    let res = await fetch(`${BASE_URL}/video?page_no=${i}&page_size=20&owner_id=${owner_id}`, {
      method: "get",
    });

    i++;
    let { data } = await res.json();
    if(!data.videos) break;
    arr = arr.concat(data.videos);
  }

  return arr;
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
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return await res.json();
};

export const create = async (
  video_title: String,
  video_desc: String,
  video_file_id: String,
  channel_id: Number,
  video_interest_id: any,
  video_thumbnail: any
) => {
  let interest = video_interest_id.join(", ");
  let res = await fetch(`${BASE_URL}/video`, {
    method: "post",
    body: JSON.stringify({
      video_title: video_title,
      video_desc: video_desc,
      video_file_id: video_file_id,
      channel_id: channel_id,
      video_interest_id: interest,
      video_thumbnail: video_thumbnail,
    }),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return await res.json();
};

export const update = async (
  video_title: String,
  video_desc: String,
  video_file_id: String,
  video_id: Number,
  video_interest_id: any,
  video_thumbnail: any
) => {
  let interest = video_interest_id.join(", ");
  let res = await fetch(`${BASE_URL}/video/${video_id}`, {
    method: "put",
    body: JSON.stringify({
      video_title: video_title,
      video_desc: video_desc,
      video_file_id: video_file_id,
      video_interest_id: interest,
      video_thumbnail: video_thumbnail,
    }),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return await res.json();
};
