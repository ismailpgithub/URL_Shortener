import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (url, slug) => {
  const { data } = await axiosInstance.post(
    "http://localhost:3000/api/create",
    { url, slug }
  );
  return data.shortUrl;
};
