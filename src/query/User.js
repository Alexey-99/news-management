import { getLocaleLocaleStorageParam } from "../params/LocaleStorageParams";

const PREFIX_BEARER = "Bearer ";
const URL_USER_CONTROLLER = "http://localhost:8081/api/v2/user";
const PARAM_NAME_SIZE = "size";
const PARAM_NAME_PAGE = "page";
const PARAM_NAME_SORT_FIELD = "sort-field";
const PARAM_NAME_SORT_TYPE = "sort-type";

export const registrationUserQuery = async (user) => {
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_USER_CONTROLLER}/registration`;
  return await fetch(url, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
    body: JSON.stringify({ ...user }),
  });
};

export const changeUserRoleQuery = async (token, userLogin, roleId) => {
  const user = {
    userLogin: userLogin,
    roleId: roleId,
  };
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_USER_CONTROLLER}/role`;
  return await fetch(url, {
    mode: "cors",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: PREFIX_BEARER + token,
      "Accept-Language": language,
    },
    body: JSON.stringify(user),
  });
};

export const changeUserLoginQuery = async (token, userId, newLogin) => {
  const user = {
    userId: userId,
    newLogin: newLogin,
  };
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_USER_CONTROLLER}/login`;
  return await fetch(url, {
    mode: "cors",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: PREFIX_BEARER + token,
      "Accept-Language": language,
    },
    body: JSON.stringify(user),
  });
};

export const deleteUserByIdQuery = async (token, userId) => {
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_USER_CONTROLLER}/${userId}`;
  return await fetch(url, {
    mode: "cors",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: PREFIX_BEARER + token,
      "Accept-Language": language,
    },
  });
};

export const getAllUsersQuery = async (
  token,
  size,
  numberPage,
  sortField,
  sortType
) => {
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_USER_CONTROLLER}/all?${PARAM_NAME_SIZE}=${size}&${PARAM_NAME_PAGE}=${numberPage}&${PARAM_NAME_SORT_FIELD}=${sortField}&${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: PREFIX_BEARER + token,
      "Accept-Language": language,
    },
  });
};

export const getUserByIdQuery = async (token, id) => {
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_USER_CONTROLLER}/${id}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: PREFIX_BEARER + token,
      "Accept-Language": language,
    },
  });
};

export const getUserByLoginQuery = async (token, login) => {
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_USER_CONTROLLER}/login/${login}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: PREFIX_BEARER + token,
      "Accept-Language": language,
    },
  });
};

export const getUsersByRoleQuery = async (
  token,
  role,
  size,
  numberPage,
  sortField,
  sortType
) => {
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_USER_CONTROLLER}/role/${role}?${PARAM_NAME_SIZE}=${size}&${PARAM_NAME_PAGE}=${numberPage}&${PARAM_NAME_SORT_FIELD}=${sortField}&${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: PREFIX_BEARER + token,
      "Accept-Language": language,
    },
  });
};
