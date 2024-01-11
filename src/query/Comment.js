import { getLocaleSessionStorageParam } from "../params/SessionStorageParams";

const PREFIX_BEARER = "Bearer ";
const URL_COMMENT_CONTROLLER = "http://localhost:8081/api/v2/comment";
const PARAM_NAME_SIZE = "size";
const PARAM_NAME_PAGE = "page";
const PARAM_NAME_SORT_FIELD = "sort-field";
const PARAM_NAME_SORT_TYPE = "sort-type";

export const deleteCommentQuery = async (token, commentId) => {
  const language = getLocaleSessionStorageParam();
  const url = `${URL_COMMENT_CONTROLLER}/${commentId}`;
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

export const updateCommentQuery = async (token, comment) => {
  const language = getLocaleSessionStorageParam();
  const url = `${URL_COMMENT_CONTROLLER}/${comment.id}`;
  return await fetch(url, {
    mode: "cors",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: PREFIX_BEARER + token,
      "Accept-Language": language,
    },
    body: JSON.stringify({ ...comment, content: comment.content }),
  });
};

export const createCommentQuery = async (token, comment) => {
  const language = getLocaleSessionStorageParam();
  const url = URL_COMMENT_CONTROLLER;
  return await fetch(url, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${PREFIX_BEARER + token}`,
      "Accept-Language": language,
    },
    body: JSON.stringify(comment),
  });
};

export const getCommentByIdQuery = async (commentId) => {
  const language = getLocaleSessionStorageParam();
  const url = `${URL_COMMENT_CONTROLLER}/${commentId}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const getAllCommentsQuery = async (
  size,
  numberPage,
  sortField,
  sortType
) => {
  const language = getLocaleSessionStorageParam();
  const url = `${URL_COMMENT_CONTROLLER}/all?${PARAM_NAME_SIZE}=${size}&${PARAM_NAME_PAGE}=${numberPage}&${PARAM_NAME_SORT_FIELD}=${sortField}&${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const getCommentsByNewsIdQuery = async (newsId, sortType) => {
  const language = getLocaleSessionStorageParam();
  const url = `${URL_COMMENT_CONTROLLER}/news/${newsId}?${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const getCommentsByNewsIdWithPaginationQuery = async (
  newsId,
  size,
  numberPage,
  sortField,
  sortType
) => {
  const language = getLocaleSessionStorageParam();
  const url = `${URL_COMMENT_CONTROLLER}/news/page/${newsId}?${PARAM_NAME_SIZE}=${size}&${PARAM_NAME_PAGE}=${numberPage}&${PARAM_NAME_SORT_FIELD}=${sortField}&${PARAM_NAME_SORT_TYPE}=${sortType}`;
  return await fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });
};

export const deleteCommentsByNewsIdQuery = async (token, newsId) => {
  const language = getLocaleSessionStorageParam();
  const url = `${URL_COMMENT_CONTROLLER}/news/${newsId}`;
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
