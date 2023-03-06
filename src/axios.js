import axios from "axios";


const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

console.log("process.env.SERVERURL: ");
console.log(process.env.REACT_APP_SERVER_URL);

const instance = axios.create({
  baseURL: serverURL +"/api/characters/get"
}); 
export default instance;
