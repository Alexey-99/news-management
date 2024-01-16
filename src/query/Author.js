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
const URL_AUTHOR_CONTROLLER = "http://localhost:8081/api/v2/author";
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

export const createAuthorQuery = async (token, author) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_AUTHOR_CONTROLLER}`;
  return await fetch(url, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: PREFIX_BEARER + token,
      "Accept-Language": language,
    },
    body: JSON.stringify({ ...author }),
  });
};

export const getAuthorByIdQuery = async (authorId) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_AUTHOR_CONTROLLER}/${authorId}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const updateAuthorQuery = async (token, author) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_AUTHOR_CONTROLLER}/${author.id}`;
  return await fetch(url, {
    mode: "cors",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: PREFIX_BEARER + token,
      "Accept-Language": language,
    },
    body: JSON.stringify({ ...author }),
  });
};

export const deleteAuthorByIdQuery = async (token, authorId) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_AUTHOR_CONTROLLER}/${authorId}`;
  return await fetch(url, {
    mode: "cors",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${PREFIX_BEARER}${token}`,
      "Accept-Language": language,
    },
  });
};

export const getAllAuthorsQuery = async (
  size,
  numberPage,
  sortField,
  sortType
) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_AUTHOR_CONTROLLER}/all?${PARAM_NAME_SIZE}=${size}&${PARAM_NAME_PAGE}=${numberPage}&${PARAM_NAME_SORT_FIELD}=${sortField}&${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const getAuthorByNewsIdQuery = async (newsId) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_AUTHOR_CONTROLLER}/news/${newsId}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const getAuthorsByPartOfNameQuery = async (
  partOfName,
  size,
  numberPage,
  sortField,
  sortType
) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_AUTHOR_CONTROLLER}/part-name/${partOfName}?${PARAM_NAME_SIZE}=${size}&${PARAM_NAME_PAGE}=${numberPage}&${PARAM_NAME_SORT_FIELD}=${sortField}&${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};
