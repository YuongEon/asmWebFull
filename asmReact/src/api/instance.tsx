import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token")!)}`,
  },
})

export default instance;