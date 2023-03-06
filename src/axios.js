import axios from "axios";

const serverURL = process.env.serverURL;

const instance = axios.create({
  baseURL: serverURL +"/api/characters/get"
});

export default instance;
