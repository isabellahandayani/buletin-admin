import { Entropy } from "entropy-string";

export const generatePass = () => {
	return new Entropy({ total: 10000, risk: 1e6 }).string();
  };