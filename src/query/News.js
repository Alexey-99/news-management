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
const URL_NEWS_CONTROLLER = "http://localhost:8081/api/v2/news";
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

export const getAllNewsQuery = async (
  size,
  numberPage,
  sortField,
  sortType
) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_NEWS_CONTROLLER}/all?${PARAM_NAME_SIZE}=${size}&${PARAM_NAME_PAGE}=${numberPage}&${PARAM_NAME_SORT_FIELD}=${sortField}&${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const getNewsByIdQuary = async (newsId) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_NEWS_CONTROLLER}/${newsId}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const getNewsByTagNameQuary = async (
  tagName,
  size,
  numberPage,
  sortField,
  sortType
) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_NEWS_CONTROLLER}/tag-name/${tagName}?${PARAM_NAME_SIZE}=${size}&${PARAM_NAME_PAGE}=${numberPage}&${PARAM_NAME_SORT_FIELD}=${sortField}&${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const getNewsByTagIdQuary = async (
  tagId,
  size,
  numberPage,
  sortField,
  sortType
) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_NEWS_CONTROLLER}/tag/${tagId}?${PARAM_NAME_SIZE}=${size}&${PARAM_NAME_PAGE}=${numberPage}&${PARAM_NAME_SORT_FIELD}=${sortField}&${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const getNewsByPartOfAuthorNameQuary = async (
  partOfAuthorName,
  size,
  numberPage,
  sortField,
  sortType
) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_NEWS_CONTROLLER}/author/part-name/${partOfAuthorName}?${PARAM_NAME_SIZE}=${size}&${PARAM_NAME_PAGE}=${numberPage}&${PARAM_NAME_SORT_FIELD}=${sortField}&${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const getNewsByAuthorIdQuary = async (
  authorId,
  size,
  numberPage,
  sortField,
  sortType
) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_NEWS_CONTROLLER}/author/${authorId}?${PARAM_NAME_SIZE}=${size}&${PARAM_NAME_PAGE}=${numberPage}&${PARAM_NAME_SORT_FIELD}=${sortField}&${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const getNewsByPartOfTitleQuary = async (
  partOfTitle,
  size,
  numberPage,
  sortField,
  sortType
) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_NEWS_CONTROLLER}/part-title/${partOfTitle}?${PARAM_NAME_SIZE}=${size}&${PARAM_NAME_PAGE}=${numberPage}&${PARAM_NAME_SORT_FIELD}=${sortField}&${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const getNewsByPartOfContentQuary = async (
  partOfContent,
  size,
  numberPage,
  sortField,
  sortType
) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_NEWS_CONTROLLER}/part-content/${partOfContent}?${PARAM_NAME_SIZE}=${size}&${PARAM_NAME_PAGE}=${numberPage}&${PARAM_NAME_SORT_FIELD}=${sortField}&${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const removeAllTagsFromNewsByNewsIdQuery = async (token, newsId) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_NEWS_CONTROLLER}/all-tags/${newsId}`;
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

export const deleteNewsByIdQuery = async (token, newsId) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_NEWS_CONTROLLER}/${newsId}`;
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

export const deleteNewsByAuthorIdQuery = async (token, authorId) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_NEWS_CONTROLLER}/author/${authorId}`;
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

export const updateNewsQuery = async (token, news) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_NEWS_CONTROLLER}/${news.id}`;
  return await fetch(url, {
    mode: "cors",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: PREFIX_BEARER + token,
      "Accept-Language": language,
    },
    body: JSON.stringify(news),
  });
};

export const createNewsQuery = async (token, news) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_NEWS_CONTROLLER}`;
  return await fetch(url, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: PREFIX_BEARER + token,
      "Accept-Language": language,
    },
    body: JSON.stringify(news),
  });
};
