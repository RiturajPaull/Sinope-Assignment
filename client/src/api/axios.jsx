import axios from "axios";
import { baseURL } from "./SummaryAPI";

export const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
