import { axiosInstance } from "./api";

// Remember to implement Deduplication

export const getCats = () => {
  return axiosInstance.get("/images/search", {
    params: {
      limit: 10,
    },
  });
};

export const getCatDetails = (id) => {
  return axiosInstance.get(`/images/${id}`);
};
