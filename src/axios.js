import axios from "axios";

//Old url config
// const serverURL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const serverURL = "express-aws-eb.eba-kxz2g5au.ca-central-1.elasticbeanstalk.com"

const instance = axios.create({
  baseURL: serverURL +"/api/characters/get"
}); 
export default instance;
