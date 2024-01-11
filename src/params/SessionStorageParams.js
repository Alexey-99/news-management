//SECTION

const CODE_CONTENT_SECTION = "CODE_CONTENT_SECTION";

export const getCodeContentSectionSessionStorageParam = () => {
  return sessionStorage.getItem(CODE_CONTENT_SECTION);
};

export const setCodeContentSectionSessionStorageParam = (
  codeContentSection
) => {
  sessionStorage.setItem(CODE_CONTENT_SECTION, codeContentSection);
};

//OTHER

const JWT_TOKEN = "JWT_TOKEN";
const USER_ROLE = "USER_ROLE";
const CURRENT_LANGUAGE = "CURRENT_LANGUAGE";

export const getJwtTokenSessionStorageParam = () => {
  return sessionStorage.getItem(JWT_TOKEN);
};

export const setJwtTokenSessionStorageParam = (token) => {
  sessionStorage.setItem(JWT_TOKEN, token);
};

export const removeJwtTokenSessionStorageParam = () => {
  sessionStorage.removeItem(JWT_TOKEN);
};

export const getLocaleSessionStorageParam = () => {
  return sessionStorage.getItem(CURRENT_LANGUAGE);
};

export const setLocaleSessionStorageParam = (language) => {
  sessionStorage.setItem(CURRENT_LANGUAGE, language);
};

export const getUserRoleSessionStorageParam = () => {
  return sessionStorage.getItem(USER_ROLE);
};

export const setUserRoleSessionStorageParam = (userRole) => {
  sessionStorage.setItem(USER_ROLE, userRole);
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

export const getNewsNumberPageSessionStorageParam = () => {
  return sessionStorage.getItem(NEWS_NUMBER_PAGE);
};

export const setNewsNumberPageSessionStorageParam = (numberPage) => {
  sessionStorage.setItem(NEWS_NUMBER_PAGE, numberPage);
};

export const getNewsMaxNumberPageSessionStorageParam = () => {
  return sessionStorage.getItem(NEWS_MAX_NUMBER_PAGE);
};

export const setNewsMaxNumberPageSessionStorageParam = (maxNumberPage) => {
  sessionStorage.setItem(NEWS_MAX_NUMBER_PAGE, maxNumberPage);
};

export const getNewsSizePageSessionStorageParam = () => {
  return sessionStorage.getItem(NEWS_SIZE_PAGE);
};

export const setNewsSizePageSessionStorageParam = (newsSizePage) => {
  sessionStorage.setItem(NEWS_SIZE_PAGE, newsSizePage);
};

export const getNewsSortFieldSessionStorageParam = () => {
  return sessionStorage.getItem(NEWS_SORT_FIELD);
};

export const setNewsSortFieldSessionStorageParam = (newsSortField) => {
  sessionStorage.setItem(NEWS_SORT_FIELD, newsSortField);
};

export const getNewsSortTypeSessionStorageParam = () => {
  return sessionStorage.getItem(NEWS_SORT_TYPE);
};

export const setNewsSortTypeSessionStorageParam = (newsSortType) => {
  sessionStorage.setItem(NEWS_SORT_TYPE, newsSortType);
};

export const getNewsTagsSortTypeSessionStorageParam = () => {
  return sessionStorage.getItem(NEWS_TAGS_SORT_TYPE);
};

export const setNewsTagsSortTypeSessionStorageParam = (newsTagsSortType) => {
  sessionStorage.setItem(NEWS_TAGS_SORT_TYPE, newsTagsSortType);
};


export const removeNewsTagsSortTypeSessionStorageParam = () => {
  sessionStorage.removeItem(NEWS_TAGS_SORT_TYPE);
};

export const getNewsSearchDescriptionSessionStorageParam = () => {
  return sessionStorage.getItem(NEWS_SEARCH_DESCRIPTION);
};

export const setNewsSearchDescriptionSessionStorageParam = (
  searchDescription
) => {
  sessionStorage.setItem(NEWS_SEARCH_DESCRIPTION, searchDescription);
};

export const removeNewsSearchDescriptionSessionStorageParam = () => {
  sessionStorage.removeItem(NEWS_SEARCH_DESCRIPTION);
};

export const getNewsSearchTypeSessionStorageParam = () => {
  return sessionStorage.getItem(NEWS_SEARCH_TYPE);
};

export const setNewsSearchTypeSessionStorageParam = (searchType) => {
  sessionStorage.setItem(NEWS_SEARCH_TYPE, searchType);
};

export const removeNewsSearchTypeSessionStorageParam = () => {
  sessionStorage.removeItem(NEWS_SEARCH_TYPE);
};

//TAGS

const TAGS_NUMBER_PAGE = "TAGS_NUMBER_PAGE";
const TAGS_SIZE_PAGE = "TAGS_SIZE_PAGE";
const TAGS_MAX_NUMBER_PAGE = "TAGS_MAX_NUMBER_PAGE";
const TAGS_SORT_FIELD = "TAGS_SORT_FIELD";
const TAGS_SORT_TYPE = "TAGS_SORT_TYPE";
const TAGS_SEARCH_DESCRIPTION = "TAGS_SEARCH_DESCRIPTION";
const TAGS_SEARCH_TYPE = "TAGS_SEARCH_TYPE";

export const getTagsNumberPageSessionStorageParam = () => {
  return sessionStorage.getItem(TAGS_NUMBER_PAGE);
};

export const setTagsNumberPageSessionStorageParam = (numberPage) => {
  sessionStorage.setItem(TAGS_NUMBER_PAGE, numberPage);
};

export const getTagsMaxNumberPageSessionStorageParam = () => {
  return sessionStorage.getItem(TAGS_MAX_NUMBER_PAGE);
};

export const setTagsMaxNumberPageSessionStorageParam = (maxNumberPage) => {
  sessionStorage.setItem(TAGS_MAX_NUMBER_PAGE, maxNumberPage);
};

export const getTagsSizePageSessionStorageParam = () => {
  return sessionStorage.getItem(TAGS_SIZE_PAGE);
};

export const setTagsSizePageSessionStorageParam = (sizePage) => {
  sessionStorage.setItem(TAGS_SIZE_PAGE, sizePage);
};

export const getTagsSortFieldSessionStorageParam = () => {
  return sessionStorage.getItem(TAGS_SORT_FIELD);
};

export const setTagsSortFieldSessionStorageParam = (sortField) => {
  sessionStorage.setItem(TAGS_SORT_FIELD, sortField);
};

export const getTagsSortTypeSessionStorageParam = () => {
  return sessionStorage.getItem(TAGS_SORT_TYPE);
};

export const setTagsSortTypeSessionStorageParam = (sortType) => {
  sessionStorage.setItem(TAGS_SORT_TYPE, sortType);
};

export const getTagsSearchDescriptionSessionStorageParam = () => {
  return sessionStorage.getItem(TAGS_SEARCH_DESCRIPTION);
};

export const setTagsSearchDescriptionSessionStorageParam = (
  searchDescription
) => {
  sessionStorage.setItem(TAGS_SEARCH_DESCRIPTION, searchDescription);
};

export const removeTagsSearchDescriptionSessionStorageParam = () => {
  sessionStorage.removeItem(TAGS_SEARCH_DESCRIPTION);
};

export const getTagsSearchTypeSessionStorageParam = () => {
  return sessionStorage.getItem(TAGS_SEARCH_TYPE);
};

export const setTagsSearchTypeSessionStorageParam = (searchType) => {
  sessionStorage.setItem(TAGS_SEARCH_TYPE, searchType);
};

export const removeTagsSearchTypeSessionStorageParam = () => {
  sessionStorage.removeItem(TAGS_SEARCH_TYPE);
};

//AUTHORS

const AUTHORS_NUMBER_PAGE = "AUTHORS_NUMBER_PAGE";
const AUTHORS_SIZE_PAGE = "AUTHORS_SIZE_PAGE";
const AUTHORS_MAX_NUMBER_PAGE = "AUTHORS_MAX_NUMBER_PAGE";
const AUTHORS_SORT_FIELD = "AUTHORS_SORT_FIELD";
const AUTHORS_SORT_TYPE = "AUTHORS_SORT_TYPE";
const AUTHORS_SEARCH_DESCRIPTION = "AUTHORS_SEARCH_DESCRIPTION";
const AUTHORS_SEARCH_TYPE = "AUTHORS_SEARCH_TYPE";

export const getAuthorsNumberPageSessionStorageParam = () => {
  return sessionStorage.getItem(AUTHORS_NUMBER_PAGE);
};

export const setAuthorsNumberPageSessionStorageParam = (numberPage) => {
  sessionStorage.setItem(AUTHORS_NUMBER_PAGE, numberPage);
};

export const getAuthorsMaxNumberPageSessionStorageParam = () => {
  return sessionStorage.getItem(AUTHORS_MAX_NUMBER_PAGE);
};

export const setAuthorsMaxNumberPageSessionStorageParam = (maxNumberPage) => {
  sessionStorage.setItem(AUTHORS_MAX_NUMBER_PAGE, maxNumberPage);
};

export const getAuthorsSizePageSessionStorageParam = () => {
  return sessionStorage.getItem(AUTHORS_SIZE_PAGE);
};

export const setAuthorsSizePageSessionStorageParam = (sizePage) => {
  sessionStorage.setItem(AUTHORS_SIZE_PAGE, sizePage);
};

export const getAuthorsSortFieldSessionStorageParam = () => {
  return sessionStorage.getItem(AUTHORS_SORT_FIELD);
};

export const setAuthorsSortFieldSessionStorageParam = (sortField) => {
  sessionStorage.setItem(AUTHORS_SORT_FIELD, sortField);
};

export const getAuthorsSortTypeSessionStorageParam = () => {
  return sessionStorage.getItem(AUTHORS_SORT_TYPE);
};

export const setAuthorsSortTypeSessionStorageParam = (sortType) => {
  sessionStorage.setItem(AUTHORS_SORT_TYPE, sortType);
};

export const getAuthorsSearchDescriptionSessionStorageParam = () => {
  return sessionStorage.getItem(AUTHORS_SEARCH_DESCRIPTION);
};

export const setAuthorsSearchDescriptionSessionStorageParam = (
  searchDescription
) => {
  sessionStorage.setItem(AUTHORS_SEARCH_DESCRIPTION, searchDescription);
};

export const removeAuthorsSearchDescriptionSessionStorageParam = () => {
  sessionStorage.removeItem(AUTHORS_SEARCH_DESCRIPTION);
};

export const getAuthorsSearchTypeSessionStorageParam = () => {
  return sessionStorage.getItem(AUTHORS_SEARCH_TYPE);
};

export const setAuthorsSearchTypeSessionStorageParam = (searchType) => {
  sessionStorage.setItem(AUTHORS_SEARCH_TYPE, searchType);
};

export const removeAuthorsSearchTypeSessionStorageParam = () => {
  sessionStorage.removeItem(AUTHORS_SEARCH_TYPE);
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
