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
const URL_TAG_CONTROLLER = "http://localhost:8081/api/v2/tag";
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

export const createTagQuery = async (token, tag) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_TAG_CONTROLLER}`;
  return await fetch(url, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${PREFIX_BEARER}${token}`,
      "Accept-Language": language,
    },
    body: JSON.stringify({ ...tag }),
  });
};

export const getTagByIdQuery = async (tagId) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_TAG_CONTROLLER}/${tagId}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const updateTagQuery = async (token, tag) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_TAG_CONTROLLER}/${tag.id}`;
  return await fetch(url, {
    mode: "cors",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: PREFIX_BEARER + token,
      "Accept-Language": language,
    },
    body: JSON.stringify({ ...tag }),
  });
};

export const deleteTagByIdQuery = async (token, tagId) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_TAG_CONTROLLER}/${tagId}`;
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

export const getAllTagsQueryWithPages = async (
  size,
  numberPage,
  sortField,
  sortType
) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_TAG_CONTROLLER}/all/page?${PARAM_NAME_SIZE}=${size}&${PARAM_NAME_PAGE}=${numberPage}&${PARAM_NAME_SORT_FIELD}=${sortField}&${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "Get",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const getAllTagsQuery = async (sortType) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_TAG_CONTROLLER}/all?${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const removeTagByIdFromAllNewsQuery = async (token, tagId) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_TAG_CONTROLLER}/all-news/${tagId}`;
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

export const deleteTagByIdFromNewsByIdQuery = async (token, tagId, newsId) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_TAG_CONTROLLER}/from-news?tag=${tagId}&news=${newsId}`;
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

export const getTagsByNewsIdQuery = async (
  newsId,
  size,
  numberPage,
  sortField,
  sortType
) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_TAG_CONTROLLER}/news/page/${newsId}?${PARAM_NAME_SIZE}=${size}&${PARAM_NAME_PAGE}=${numberPage}&${PARAM_NAME_SORT_FIELD}=${sortField}&${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const getAllTagsByNewsIdQuery = async (newsId, sortType) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_TAG_CONTROLLER}/news/${newsId}?${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const getTagsByPartOfNameQuery = async (
  partOfName,
  size,
  numberPage,
  sortField,
  sortType
) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_TAG_CONTROLLER}/part-name/${partOfName}?${PARAM_NAME_SIZE}=${size}&${PARAM_NAME_PAGE}=${numberPage}&${PARAM_NAME_SORT_FIELD}=${sortField}&${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const addTagByIdToNewsByIdQuery = async (token, tagId, newsId) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_TAG_CONTROLLER}/to-news?tag=${tagId}&news=${newsId}`;
  return await fetch(url, {
    mode: "cors",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${PREFIX_BEARER}${token}`,
      "Accept-Language": language,
    },
  });
};
 