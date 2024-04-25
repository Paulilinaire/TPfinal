import api from "./api.js";
import {authHeader} from "../helper/authHeader.js";

const getMonthPointing = (date, user) => {
    return api.post(`/admin/users/pointing/month`, { date, id:user.id }, {headers: authHeader()}); 
  };

  export const pointingService =
    {
        getMonthPointing
    };