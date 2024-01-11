export const SEARCH_TYPE_ID = { type: "ID", pattern: "\\d+" };
export const SEARCH_TYPE_LOGIN = { type: "LOGIN", pattern: "[^<>]{3,30}" };
export const SEARCH_TYPE_ROLE = { type: "ROLE", pattern: "[^<>]+" };

export const getSearchTypesValues = () => {
  return Array.of(SEARCH_TYPE_ID, SEARCH_TYPE_LOGIN, SEARCH_TYPE_ROLE);
};
