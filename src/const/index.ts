import FALLBACK from "../assets/fallback.svg";
import THUMBNAIL from "../assets/thumbnail.svg";

export const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const FALLBACK_IMG = FALLBACK;

export const THUMBNAIL_PLACEHOLDER = THUMBNAIL;

export const ID = {
  CATEGORY: process.env.REACT_APP_CATEGORY_FOLDER,
  VIDEO_THUMBNAIL: process.env.REACT_APP_VIDEO_THUMBNAIL_FOLDER,
  VIDEO: process.env.REACT_APP_VIDEO_FOLDER,
  PLAYLIST: process.env.REACT_APP_PLAYLIST_FOLDER,
  CHANNEL: process.env.REACT_APP_CHANNEL_FOLDER,
};

export const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

export const DRIVE_URL = "https://drive.google.com/uc?id=";

export const TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token";

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export const REFRESH_TOKEN = process.env.REACT_APP_REFRESH_TOKEN;
