import axios from "axios";

const api = axios.create({
  baseURL: "http://10.106.131.49:3333", // Android Studio (emulador)
  // baseURL: "http://localhost:3333", // se rodar no iOS ou web
  timeout: 5000,
});

export default api;
