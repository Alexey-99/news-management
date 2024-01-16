import { getLocaleLocaleStorageParam } from "../params/LocaleStorageParams";

const URL_AUTH_CONTROLLER = "http://localhost:8081/api/v2/auth";

export const createJwtTokenQuery = async (personInfo) => {
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_AUTH_CONTROLLER}/login`;
  return await fetch(url, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
    body: JSON.stringify(personInfo),
  });
};

export const updateJwtTokennQuery = async (token) => {
  const language = getLocaleLocaleStorageParam();
  const requestBody = {
    accessToken: token,
  };
  const url = `${URL_AUTH_CONTROLLER}/token`;
  return await fetch(url, {
    mode: "cors",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
    body: JSON.stringify(requestBody),
  });
};

export const validationJwtTokenUser = async (token) => {
  const language = getLocaleLocaleStorageParam();
  const validJwtTokenObject = {
    jwtToken: token,
  };
  const url = `${URL_AUTH_CONTROLLER}/token/valid/user`;
  return await fetch(url, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
    body: JSON.stringify(validJwtTokenObject),
  });
};

export const validationJwtTokenAdmin = async (token) => {
  const language = getLocaleLocaleStorageParam();
  const validJwtTokenObject = {
    jwtToken: token,
  };
  const url = `${URL_AUTH_CONTROLLER}/token/valid/admin`;
  return await fetch(url, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
    body: JSON.stringify(validJwtTokenObject),
  });
};
