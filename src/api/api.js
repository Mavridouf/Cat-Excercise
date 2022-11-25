import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "x-api-key":
      "live_1H5pydTdhcTA34guZjFlZMcBKf1UV1SRNFSyar5nnGy9ic0SpMjlYwOANQ4ONGjz",
  },
});
