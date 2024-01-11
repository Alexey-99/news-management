import { getLocaleSessionStorageParam } from "../params/SessionStorageParams";

const URL_AUTH_CONTROLLER = "http://localhost:8081/api/v2/auth";

export const createJwtTokenQuery = async (personInfo) => {
  const language = getLocaleSessionStorageParam();
  const url = `${URL_AUTH_CONTROLLER}/token`;
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

export const validationJwtTokenUser = async (token) => {
  const language = getLocaleSessionStorageParam();
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
  const language = getLocaleSessionStorageParam();
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
