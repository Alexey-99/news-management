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
const URL_ROLE_CONTROLLER = "http://localhost:8081/api/v2/role";

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
 
export const getAllRolesQuery = async (token) => {
  updateJwtToken();
  const language = getLocaleLocaleStorageParam();
  const url = `${URL_ROLE_CONTROLLER}/all`;
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
