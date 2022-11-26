import { axiosInstance, shortUUID } from "./api";

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

export const getFavourites = () => {
  return axiosInstance.get("/favourites");
};

export const markAsFavourite = (image_id) => {
  return axiosInstance.post("/favourites", {
    image_id: image_id,
    sub_id: shortUUID,
  });
};

export const deleteFavourite = (favourite_id) => {
  return axiosInstance.delete(`/favourites/${favourite_id}`);
};
