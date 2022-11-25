import { axiosInstance } from "./api";

// Remember to implement Deduplication

export const getCats = (limit, breed) => {
  return axiosInstance.get("/images/search", {
    params: {
      limit: limit,
      breed_id: breed,
    },
  });
};

export const getCatDetails = (id) => {
  return axiosInstance.get(`/images/${id}`);
};

export const getBreeds = () => {
  return axiosInstance.get("/breeds");
};
