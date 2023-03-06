import axios from "axios";

const serverURL = process.env.serverURL || "http://localhost:4000";

const instance = axios.create({
  baseURL: serverURL +"/api/characters/get"
}); 
export default instance;
