export const BASE_URL = process.env.API_URL || "http://localhost:8080";
export const FALLBACK_IMG =
  "https://cdn.dribbble.com/users/17914/screenshots/4902225/video-placeholder.png";
export const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbymjj26TnGSX0lK4opE_OTwYnjxGALe0kGOqMzv-76CyF7n6gY86krfyDUwqujLDAa3/exec";
export const ID = {
  CATEGORY: process.env.REACT_APP_CATEGORY_FOLDER,
  VIDEO: process.env.REACT_APP_VIDEO_FOLDER,
  PLAYLIST: process.env.REACT_APP_PLAYLIST_FOLDER,
  CHANNEL: process.env.REACT_APP_CHANNEL_FOLDER,
};

export const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
