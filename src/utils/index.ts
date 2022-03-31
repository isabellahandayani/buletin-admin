import { Entropy } from "entropy-string";

export const generatePass = () => {
  return new Entropy({ total: 10000, risk: 1e6 }).string();
};

export const getCode = (url: string) => {
  return url.split("=")[1];
};

export const getId = (url: any) => {
  return url.split("=")[1];
};

export const getLink = (id: any) => {
  return `https://drive.google.com/file/d/${id}/preview`;
};
