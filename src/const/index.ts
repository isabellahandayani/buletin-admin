export const BASE_URL = process.env.API_URL || "http://localhost:8080";

export const FALLBACK_IMG =
  "https://cdn.dribbble.com/users/17914/screenshots/4902225/video-placeholder.png";

export const ID = {
  CATEGORY: process.env.REACT_APP_CATEGORY_FOLDER,
  VIDEO_THUMBNAIL: process.env.REACT_APP_VIDEO_THUMBNAIL_FOLDER,
  VIDEO: process.env.REACT_APP_VIDEO_FOLDER,
  PLAYLIST: process.env.REACT_APP_PLAYLIST_FOLDER,
  CHANNEL: process.env.REACT_APP_CHANNEL_FOLDER,
};

export const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

export const DRIVE_URL = "https://drive.google.com/uc?id=";