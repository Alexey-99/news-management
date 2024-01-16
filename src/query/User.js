import {
  getExpiredDateJwtTokenLocaleStorageParam,
  getJwtTokenLocaleStorageParam,
  getLocaleLocaleStorageParam,
  removeExpiredDateJwtTokenLocaleStorageParam,
  removeJwtTokenLocaleStorageParam,
  removeUserLoginLocaleStorageParam,
  setExpiredDateJwtTokenLocaleStorageParam,
  setJwtTokenLocaleStorageParam,
} from "../params/LocaleStorageParams";
import { updateJwtTokennQuery } from "./Auth";

const PREFIX_BEARER = "Bearer ";
const URL_USER_CONTROLLER = "http://localhost:8081/api/v2/user";
const PARAM_NAME_SIZE = "size";
const PARAM_NAME_PAGE = "page";
const PARAM_NAME_SORT_FIELD = "sort-field";
const PARAM_NAME_SORT_TYPE = "sort-type";

const updateJwtToken = async () => {
  const expiredDate = getExpiredDateJwtTokenLocaleStorageParam();
  if (new Date(expiredDate) - new Date() - 10000 > 0) {
    const token = getJwtTokenLocaleStorageParam();
    updateJwtTokennQuery(token)
      .then(async (response) => {
        if (response.ok) {
          const responseJson = await response.json();
          setJwtTokenLocaleStorageParam(responseJson.accessToken);
          setExpiredDateJwtTokenLocaleStorageParam(
            new Date(responseJson.expiredDate)
          );
        } else if (response.status === 400) {
          removeExpiredDateJwtTokenLocaleStorageParam();
          removeJwtTokenLocaleStorageParam();
          removeUserLoginLocaleStorageParam()
        } else {
          const responseJson = await response.json();
          console.log(`Что-то пошло не так: ${responseJson}`);
        }
      })
      .catch((error) => {
        console.log(`Что-то пошло не так: ${error}`);
      });
  } else {
    removeExpiredDateJwtTokenLocaleStorageParam();
    removeJwtTokenLocaleStorageParam();
    removeUserLoginLocaleStorageParam()
  }
};

export const registrationUserQuery = async (user) => {
  updateJwtToken();
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
  updateJwtToken();
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
  updateJwtToken();
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
  updateJwtToken();
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
  updateJwtToken();
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
  updateJwtToken();
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
  updateJwtToken();
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
  updateJwtToken();
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
