import axios from "axios";

export const useApi = axios.create({
  // baseURL: 'http://192.168.0.112:3500/api'
  // baseURL: 'http://localhost:3500/api'
  baseURL: 'http://192.168.1.4:3500/api'
  // baseURL: 'http://192.168.1.14:3000/api'
});

