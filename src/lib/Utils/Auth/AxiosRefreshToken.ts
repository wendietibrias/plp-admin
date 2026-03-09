import axios from "axios";

export const refreshToken = () => {
  return axios.patch(`${import.meta.env.VITE_API_URL}/auth/refresh`);
};
