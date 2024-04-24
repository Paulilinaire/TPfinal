import api from "./api.js";
import {authHeader} from "../helper/authHeader.js";

const createUser = (user) => {
    return api.post("/admin/users", user, {headers: authHeader()});
}

const getAllUsers = () => {
    return api.get("/admin/users", {headers: authHeader()});
};

const getUserById = (id) => {
    return api.get(`/admin/users/${id}`, {headers: authHeader()});
};

const updateUser = (id) => {
    return api.put(`/admin/users/${id}`, id, {headers: authHeader()});
};

const deleteUser = (id) => {
    return api.delete(`/admin/users/${id}`, {headers: authHeader()});
};

const getJobTitles = () => {
    return api.get(`/job-title`)
};

const getRoles = () => {
    return api.get(`/role`)
};

export const userService =
    {
        createUser,
        getAllUsers,
        getUserById,
        updateUser,
        deleteUser,
        getJobTitles,
        getRoles
    };