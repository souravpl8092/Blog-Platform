import axios from "../utils/axiosConfig";

export const fetchUserBlogsAPI = async () => {
  const res = await axios.get("/blog");
  return res.data;
};
