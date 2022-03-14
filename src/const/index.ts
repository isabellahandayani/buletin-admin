import { Entropy } from "entropy-string";

export const BASE_URL = "http://localhost:8080";
export const FALLBACK_IMG =
  "https://cdn.dribbble.com/users/17914/screenshots/4902225/video-placeholder.png";

export const generatePass = () => {
  return new Entropy({ total: 10000, risk: 1e6 }).string();
};