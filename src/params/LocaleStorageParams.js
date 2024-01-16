//SECTION

const CODE_CONTENT_SECTION = "CODE_CONTENT_SECTION";

export const getCodeContentLocaleStorageParam = () => {
  return localStorage.getItem(CODE_CONTENT_SECTION);
};

export const setCodeContentLocaleStorageParam = (codeContentSection) => {
  localStorage.setItem(CODE_CONTENT_SECTION, codeContentSection);
};

//OTHER

const JWT_TOKEN = "JWT_TOKEN";
const USER_ROLE = "USER_ROLE";
const USER_LOGIN = "USER_LOGIN";
const CURRENT_LANGUAGE = "CURRENT_LANGUAGE";
const EXPIRTED_DATE_TIME_Jwt_TOKEN = "EXPIRTED_DATE_TIME_JWT_TOKEN";

export const getJwtTokenLocaleStorageParam = () => {
  return localStorage.getItem(JWT_TOKEN);
};

export const setJwtTokenLocaleStorageParam = (token) => {
  localStorage.setItem(JWT_TOKEN, token);
};

export const removeJwtTokenLocaleStorageParam = () => {
  localStorage.removeItem(JWT_TOKEN);
};

export const getLocaleLocaleStorageParam = () => {
  return localStorage.getItem(CURRENT_LANGUAGE);
};

export const setLocaleLocaleStorageParam = (language) => {
  localStorage.setItem(CURRENT_LANGUAGE, language);
};

export const getUserRoleLocaleStorageParam = () => {
  return localStorage.getItem(USER_ROLE);
};

export const setUserRoleLocaleStorageParam = (userRole) => {
  localStorage.setItem(USER_ROLE, userRole);
};

export const getExpiredDateJwtTokenLocaleStorageParam = () => {
  return localStorage.getItem(EXPIRTED_DATE_TIME_Jwt_TOKEN);
};

export const setExpiredDateJwtTokenLocaleStorageParam = (
  expiredDateJwtToken
) => {
  localStorage.setItem(EXPIRTED_DATE_TIME_Jwt_TOKEN, expiredDateJwtToken);
};

export const removeExpiredDateJwtTokenLocaleStorageParam = () => {
  localStorage.removeItem(EXPIRTED_DATE_TIME_Jwt_TOKEN);
};

export const getUserLoginLocaleStorageParam = () => {
  return localStorage.getItem(USER_LOGIN);
};

export const setUserLoginLocaleStorageParam = (login) => {
  localStorage.setItem(USER_LOGIN, login);
};

export const removeUserLoginLocaleStorageParam = () => {
  localStorage.removeItem(USER_LOGIN);
};

//NEWS

const NEWS_NUMBER_PAGE = "NEWS_NUMBER_PAGE";
const NEWS_SIZE_PAGE = "NEWS_SIZE_PAGE";
const NEWS_MAX_NUMBER_PAGE = "NEWS_MAX_NUMBER_PAGE";
const NEWS_SORT_FIELD = "NEWS_SORT_FIELD";
const NEWS_SORT_TYPE = "NEWS_SORT_TYPE";
const NEWS_TAGS_SORT_TYPE = "NEWS_TAGS_SORT_TYPE";
const NEWS_SEARCH_DESCRIPTION = "NEWS_SEARCH_DESCRIPTION";
const NEWS_SEARCH_TYPE = "NEWS_SEARCH_TYPE";

export const getNewsNumberPageLocaleStorageParam = () => {
  return localStorage.getItem(NEWS_NUMBER_PAGE);
};

export const setNewsNumberPageLocaleStorageParam = (numberPage) => {
  localStorage.setItem(NEWS_NUMBER_PAGE, numberPage);
};

export const getNewsMaxNumberPageLocaleStorageParam = () => {
  return localStorage.getItem(NEWS_MAX_NUMBER_PAGE);
};

export const setNewsMaxNumberPageLocaleStorageParam = (maxNumberPage) => {
  localStorage.setItem(NEWS_MAX_NUMBER_PAGE, maxNumberPage);
};

export const getNewsSizePageLocaleStorageParam = () => {
  return localStorage.getItem(NEWS_SIZE_PAGE);
};

export const setNewsSizePageLocaleStorageParam = (newsSizePage) => {
  localStorage.setItem(NEWS_SIZE_PAGE, newsSizePage);
};

export const getNewsSortFieldLocaleStorageParam = () => {
  return localStorage.getItem(NEWS_SORT_FIELD);
};

export const setNewsSortFieldLocaleStorageParam = (newsSortField) => {
  localStorage.setItem(NEWS_SORT_FIELD, newsSortField);
};

export const getNewsSortTypeLocaleStorageParam = () => {
  return localStorage.getItem(NEWS_SORT_TYPE);
};

export const setNewsSortTypeLocaleStorageParam = (newsSortType) => {
  localStorage.setItem(NEWS_SORT_TYPE, newsSortType);
};

export const getNewsTagsSortTypeLocaleStorageParam = () => {
  return localStorage.getItem(NEWS_TAGS_SORT_TYPE);
};

export const setNewsTagsSortTypeLocaleStorageParam = (newsTagsSortType) => {
  localStorage.setItem(NEWS_TAGS_SORT_TYPE, newsTagsSortType);
};

export const removeNewsTagsSortTypeLocaleStorageParam = () => {
  localStorage.removeItem(NEWS_TAGS_SORT_TYPE);
};

export const getNewsSearchDescriptionLocaleStorageParam = () => {
  return localStorage.getItem(NEWS_SEARCH_DESCRIPTION);
};

export const setNewsSearchDescriptionLocaleStorageParam = (
  searchDescription
) => {
  localStorage.setItem(NEWS_SEARCH_DESCRIPTION, searchDescription);
};

export const removeNewsSearchDescriptionLocaleStorageParam = () => {
  localStorage.removeItem(NEWS_SEARCH_DESCRIPTION);
};

export const getNewsSearchTypeLocaleStorageParam = () => {
  return localStorage.getItem(NEWS_SEARCH_TYPE);
};

export const setNewsSearchTypeLocaleStorageParam = (searchType) => {
  localStorage.setItem(NEWS_SEARCH_TYPE, searchType);
};

export const removeNewsSearchTypeLocaleStorageParam = () => {
  localStorage.removeItem(NEWS_SEARCH_TYPE);
};

//TAGS

const TAGS_NUMBER_PAGE = "TAGS_NUMBER_PAGE";
const TAGS_SIZE_PAGE = "TAGS_SIZE_PAGE";
const TAGS_MAX_NUMBER_PAGE = "TAGS_MAX_NUMBER_PAGE";
const TAGS_SORT_FIELD = "TAGS_SORT_FIELD";
const TAGS_SORT_TYPE = "TAGS_SORT_TYPE";
const TAGS_SEARCH_DESCRIPTION = "TAGS_SEARCH_DESCRIPTION";
const TAGS_SEARCH_TYPE = "TAGS_SEARCH_TYPE";

export const getTagsNumberPageLocaleStorageParam = () => {
  return localStorage.getItem(TAGS_NUMBER_PAGE); 
};

export const setTagsNumberPageLocaleStorageParam = (numberPage) => {
  localStorage.setItem(TAGS_NUMBER_PAGE, numberPage);
};

export const getTagsMaxNumberPageLocaleStorageParam = () => {
  return localStorage.getItem(TAGS_MAX_NUMBER_PAGE);
};

export const setTagsMaxNumberPageLocaleStorageParam = (maxNumberPage) => {
  localStorage.setItem(TAGS_MAX_NUMBER_PAGE, maxNumberPage);
};

export const getTagsSizePageLocaleStorageParam = () => {
  return localStorage.getItem(TAGS_SIZE_PAGE);
};

export const setTagsSizePageLocaleStorageParam = (sizePage) => {
  localStorage.setItem(TAGS_SIZE_PAGE, sizePage);
};

export const getTagsSortFieldLocaleStorageParam = () => {
  return localStorage.getItem(TAGS_SORT_FIELD);
};

export const setTagsSortFieldLocaleStorageParamm = (sortField) => {
  localStorage.setItem(TAGS_SORT_FIELD, sortField);
};

export const getTagsSortTypeLocaleStorageParam = () => {
  return localStorage.getItem(TAGS_SORT_TYPE);
};

export const setTagsSortTypeLocaleStorageParam = (sortType) => {
  localStorage.setItem(TAGS_SORT_TYPE, sortType);
};

export const getTagsSearchDescriptionLocaleStorageParam = () => {
  return localStorage.getItem(TAGS_SEARCH_DESCRIPTION);
};

export const setTagsSearchDescriptionLocaleStorageParam = (
  searchDescription
) => {
  localStorage.setItem(TAGS_SEARCH_DESCRIPTION, searchDescription);
};

export const removeTagsSearchDescriptionLocaleStorageParam = () => {
  localStorage.removeItem(TAGS_SEARCH_DESCRIPTION);
};

export const getTagsSearchTypeLocaleStorageParam = () => {
  return localStorage.getItem(TAGS_SEARCH_TYPE);
};

export const setTagsSearchTypeLocaleStorageParam = (searchType) => {
  localStorage.setItem(TAGS_SEARCH_TYPE, searchType);
};

export const removeTagsSearchTypeLocaleStorageParam = () => {
  localStorage.removeItem(TAGS_SEARCH_TYPE);
};

//AUTHORS

const AUTHORS_NUMBER_PAGE = "AUTHORS_NUMBER_PAGE";
const AUTHORS_SIZE_PAGE = "AUTHORS_SIZE_PAGE";
const AUTHORS_MAX_NUMBER_PAGE = "AUTHORS_MAX_NUMBER_PAGE";
const AUTHORS_SORT_FIELD = "AUTHORS_SORT_FIELD";
const AUTHORS_SORT_TYPE = "AUTHORS_SORT_TYPE";
const AUTHORS_SEARCH_DESCRIPTION = "AUTHORS_SEARCH_DESCRIPTION";
const AUTHORS_SEARCH_TYPE = "AUTHORS_SEARCH_TYPE";

export const getAuthorsNumberPageLocalStorageParam = () => {
  return localStorage.getItem(AUTHORS_NUMBER_PAGE);
};

export const setAuthorsNumberPageLocalStorageParam = (numberPage) => {
  localStorage.setItem(AUTHORS_NUMBER_PAGE, numberPage);
};

export const getAuthorsMaxNumberPageLocalStorageParam = () => {
  return localStorage.getItem(AUTHORS_MAX_NUMBER_PAGE);
};

export const setAuthorsMaxNumberPageLocalStorageParam = (maxNumberPage) => {
  localStorage.setItem(AUTHORS_MAX_NUMBER_PAGE, maxNumberPage);
};

export const getAuthorsSizePageLocalStorageParam = () => {
  return localStorage.getItem(AUTHORS_SIZE_PAGE);
};

export const setAuthorsSizePageLocalStorageParam = (sizePage) => {
  localStorage.setItem(AUTHORS_SIZE_PAGE, sizePage);
};

export const getAuthorsSortFieldLocalStorageParam = () => {
  return localStorage.getItem(AUTHORS_SORT_FIELD);
};

export const setAuthorsSortFieldLocalStorageParam = (sortField) => {
  localStorage.setItem(AUTHORS_SORT_FIELD, sortField);
};

export const getAuthorsSortTypeLocalStorageParam = () => {
  return localStorage.getItem(AUTHORS_SORT_TYPE);
};

export const setAuthorsSortTypeLocalStorageParam = (sortType) => {
  localStorage.setItem(AUTHORS_SORT_TYPE, sortType);
};

export const getAuthorsSearchDescriptionLocalStorageParam = () => {
  return localStorage.getItem(AUTHORS_SEARCH_DESCRIPTION);
};

export const setAuthorsSearchDescriptionLocalStorageParam = (
  searchDescription
) => {
  localStorage.setItem(AUTHORS_SEARCH_DESCRIPTION, searchDescription);
};

export const removeAuthorsSearchDescriptionLocalStorageParam = () => {
  localStorage.removeItem(AUTHORS_SEARCH_DESCRIPTION);
};

export const getAuthorsSearchTypeLocalStorageParam = () => {
  return localStorage.getItem(AUTHORS_SEARCH_TYPE);
};

export const setAuthorsSearchTypeLocalStorageParam = (searchType) => {
  localStorage.setItem(AUTHORS_SEARCH_TYPE, searchType);
};

export const removeAuthorsSearchTypeLocalStorageParam = () => {
  localStorage.removeItem(AUTHORS_SEARCH_TYPE);
};

const USERS_NUMBER_PAGE = "USERS_NUMBER_PAGE";
const USERS_SIZE_PAGE = "USERS_SIZE_PAGE";
const USERS_MAX_NUMBER_PAGE = "USERS_MAX_NUMBER_PAGE";
const USERS_SORT_FIELD = "USERS_SORT_FIELD";
const USERS_SORT_TYPE = "USERS_SORT_TYPE";
const USERS_SEARCH_DESCRIPTION = "USERS_SEARCH_DESCRIPTION";
const USERS_SEARCH_TYPE = "USERS_SEARCH_TYPE";

export const getUsersNumberPageSessionStorageParam = () => {
  return sessionStorage.getItem(USERS_NUMBER_PAGE);
};

export const setUsersNumberPageSessionStorageParam = (numberPage) => {
  sessionStorage.setItem(USERS_NUMBER_PAGE, numberPage);
};

export const getUsersMaxNumberPageSessionStorageParam = () => {
  return sessionStorage.getItem(USERS_MAX_NUMBER_PAGE);
};

export const setUsersMaxNumberPageSessionStorageParam = (maxNumberPage) => {
  sessionStorage.setItem(USERS_MAX_NUMBER_PAGE, maxNumberPage);
};

export const getUsersSizePageSessionStorageParam = () => {
  return sessionStorage.getItem(USERS_SIZE_PAGE);
};

export const setUsersSizePageSessionStorageParam = (sizePage) => {
  sessionStorage.setItem(USERS_SIZE_PAGE, sizePage);
};

export const getUsersSortFieldSessionStorageParam = () => {
  return sessionStorage.getItem(USERS_SORT_FIELD);
};

export const setUsersSortFieldSessionStorageParam = (sortField) => {
  sessionStorage.setItem(USERS_SORT_FIELD, sortField);
};

export const getUsersSortTypeSessionStorageParam = () => {
  return sessionStorage.getItem(USERS_SORT_TYPE);
};

export const setUsersSortTypeSessionStorageParam = (sortType) => {
  sessionStorage.setItem(USERS_SORT_TYPE, sortType);
};

export const getUsersSearchDescriptionSessionStorageParam = () => {
  return sessionStorage.getItem(USERS_SEARCH_DESCRIPTION);
};

export const setUsersSearchDescriptionSessionStorageParam = (
  searchDescription
) => {
  sessionStorage.setItem(USERS_SEARCH_DESCRIPTION, searchDescription);
};

export const removeUsersSearchDescriptionSessionStorageParam = () => {
  sessionStorage.removeItem(USERS_SEARCH_DESCRIPTION);
};

export const getUsersSearchTypeSessionStorageParam = () => {
  return sessionStorage.getItem(USERS_SEARCH_TYPE);
};

export const setUsersSearchTypeSessionStorageParam = (searchType) => {
  sessionStorage.setItem(USERS_SEARCH_TYPE, searchType);
};

export const removeUsersSearchTypeSessionStorageParam = () => {
  sessionStorage.removeItem(USERS_SEARCH_TYPE);
};
