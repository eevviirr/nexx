import axios from "axios";
import { userType } from "../types/userType";

export const axiosBase = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});


export const updateUser = (body: userType) => {
  axiosBase.patch("user/update", body);
};
