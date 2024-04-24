import api from "./api.js";
import {authHeader} from "../helper/authHeader.js";

const getMonthPointing = (date) => {
    return api.post(`/pointing/month`, { date }, {headers: authHeader()}); 
  };

  export const pointingService =
    {
        getMonthPointing
    };