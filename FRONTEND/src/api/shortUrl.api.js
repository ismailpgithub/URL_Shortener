import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (url, slug) => {
  const { data } = await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/api/create`,
    { url, slug }
  );
  return data.shortUrl;
};
