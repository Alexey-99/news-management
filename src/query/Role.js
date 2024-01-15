import { getLocaleLocaleStorageParam } from "../params/LocaleStorageParams";

const PREFIX_BEARER = "Bearer ";
const URL_ROLE_CONTROLLER = "http://localhost:8081/api/v2/role";

export const getAllRolesQuery = async (token) => {
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
