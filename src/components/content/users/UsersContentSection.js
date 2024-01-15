import { useState } from "react";
import {
  getJwtTokenLocaleStorageParam,
  getUsersNumberPageSessionStorageParam,
  getUsersSearchDescriptionSessionStorageParam,
  getUsersSearchTypeSessionStorageParam,
  getUsersSizePageSessionStorageParam,
  getUsersSortFieldSessionStorageParam,
  getUsersSortTypeSessionStorageParam,
  removeJwtTokenLocaleStorageParam,
  removeUsersSearchDescriptionSessionStorageParam,
  removeUsersSearchTypeSessionStorageParam,
  setUserRoleLocaleStorageParam,
  setUsersMaxNumberPageSessionStorageParam,
  setUsersNumberPageSessionStorageParam,
  setUsersSearchDescriptionSessionStorageParam,
  setUsersSearchTypeSessionStorageParam,
  setUsersSizePageSessionStorageParam,
  setUsersSortFieldSessionStorageParam,
  setUsersSortTypeSessionStorageParam,
} from "../../../params/LocaleStorageParams";
import { PAGE_SIZE_VALUES } from "./components/pagination/PageSizeValues";
import {
  SEARCH_TYPE_ID,
  SEARCH_TYPE_LOGIN,
  SEARCH_TYPE_ROLE,
  getSearchTypesValues,
} from "./components/search/type/SearchType";
import { ROLE_ADMIN, ROLE_GUEST } from "../../../role/UserRole";
import { Button, Modal } from "react-bootstrap";
import { ASC, DESC } from "./components/sort/SortType";
import { USER_ID, USER_LOGIN, USER_ROLE } from "./components/sort/SortField";
import { LOCALE_EN, LOCALE_RU } from "../../../locate/Locale";
import { validationJwtTokenAdmin } from "../../../query/Auth";
import {
  getAllUsersQuery,
  getUserByIdQuery,
  getUserByLoginQuery,
  getUsersByRoleQuery,
} from "../../../query/User";
import SearchUsers from "./components/search/SearchUsers";
import UsersPagination from "./components/pagination/UsersPagination";
import UsersList from "./components/content/UsersList";
import CreateUserForm from "./components/form/CreateUserForm";

const UsersContentSection = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;

  const DEFAULT_NUMBER_PAGE = 1;
  const DEFAULT_SIZE_PAGE = PAGE_SIZE_VALUES[0];
  const DEFAULT_SORT_FIELD = USER_ID;
  const DEFAULT_SORT_TYPE = ASC;

  const [searchDescription, setSearchDescription] = useState("");
  const [searchDescriptionPattern, setSearchDescriptionPattern] = useState("");
  const [searchType, setSearchType] = useState("");

  const [usersList, setUsersList] = useState([]);

  const [numberPage, setNumberPage] = useState(DEFAULT_NUMBER_PAGE);
  const [size, setSize] = useState(DEFAULT_SIZE_PAGE);
  const [maxNumberPage, setMaxNumberPage] = useState(DEFAULT_NUMBER_PAGE);
  const [countAllEntity, setCountAllEntity] = useState();
  const [sortField, setSortField] = useState(DEFAULT_SORT_FIELD);
  const [sortType, setSortType] = useState(DEFAULT_SORT_TYPE);
  const [isNeedInit, setIsNeedInit] = useState(true);
  const [responceException, setResponceException] = useState("");
  const [isShowModalCreateUserForm, setIsShowModalCreateUserForm] =
    useState(false);

  const findNumberPage = () => {
    const pageSessionStorage = getUsersNumberPageSessionStorageParam();
    if (pageSessionStorage !== null) {
      const numberPageMatchArray = pageSessionStorage.match("\\d+");
      if (
        numberPageMatchArray !== null &&
        numberPageMatchArray[0] !== null &&
        numberPageMatchArray[0] === pageSessionStorage
      ) {
        setNumberPage(pageSessionStorage);
        return pageSessionStorage;
      } else {
        setUsersNumberPageSessionStorageParam(DEFAULT_NUMBER_PAGE);
        setNumberPage(DEFAULT_NUMBER_PAGE);
        return DEFAULT_NUMBER_PAGE;
      }
    } else {
      setUsersNumberPageSessionStorageParam(DEFAULT_NUMBER_PAGE);
      setNumberPage(DEFAULT_NUMBER_PAGE);
      return DEFAULT_NUMBER_PAGE;
    }
  };

  const findSizePage = () => {
    const sizePageSessionStorage = getUsersSizePageSessionStorageParam();
    const isFoundSize =
      PAGE_SIZE_VALUES.filter((value) => value == sizePageSessionStorage)
        .length > 0;
    if (isFoundSize) {
      setSize(sizePageSessionStorage);
      return sizePageSessionStorage;
    } else {
      setUsersSizePageSessionStorageParam(DEFAULT_SIZE_PAGE);
      setSize(DEFAULT_SIZE_PAGE);
      return DEFAULT_SIZE_PAGE;
    }
  };

  const findSortField = () => {
    let result = DEFAULT_SORT_FIELD;
    const sortFieldSessionStorage = getUsersSortFieldSessionStorageParam();
    if (sortFieldSessionStorage != null && sortFieldSessionStorage !== "") {
      if (USER_LOGIN === sortFieldSessionStorage) {
        setSortField(USER_LOGIN);
        result = USER_LOGIN;
      } else if (USER_ID === sortFieldSessionStorage) {
        setSortField(USER_ID);
        result = USER_ID;
      } else if (USER_ROLE === sortFieldSessionStorage) {
        setSortField(USER_ROLE);
        result = USER_ROLE;
      } else {
        setSortField(DEFAULT_SORT_FIELD);
        setUsersSortFieldSessionStorageParam(DEFAULT_SORT_FIELD);
      }
    } else {
      setSortField(DEFAULT_SORT_FIELD);
      setUsersSortFieldSessionStorageParam(DEFAULT_SORT_FIELD);
    }
    return result;
  };

  const findSortType = () => {
    let result = DEFAULT_SORT_TYPE;
    const sortTypeSessionStorage = getUsersSortTypeSessionStorageParam();
    if (sortTypeSessionStorage != null && sortTypeSessionStorage !== "") {
      if (ASC === sortTypeSessionStorage) {
        setSortType(ASC);
        result = ASC;
      } else if (DESC === sortTypeSessionStorage) {
        setSortType(DESC);
        result = DESC;
      } else {
        setSortType(DEFAULT_SORT_TYPE);
        setUsersSortTypeSessionStorageParam(DEFAULT_SORT_TYPE);
      }
    } else {
      setSortType(DEFAULT_SORT_TYPE);
      setUsersSortTypeSessionStorageParam(DEFAULT_SORT_TYPE);
    }
    return result;
  };

  const findSearchType = () => {
    let result = "";
    const searchTypeSessionStorage = getUsersSearchTypeSessionStorageParam();
    if (searchTypeSessionStorage !== null) {
      const foundSearchType = getSearchTypesValues().filter(
        (searchType) => searchTypeSessionStorage === searchType.type
      )[0];
      if (findNumberPage !== null) {
        result = searchTypeSessionStorage;
        setSearchDescriptionPattern(foundSearchType.pattern);
        setSearchType(foundSearchType.type);
      } else {
        removeUsersSearchTypeSessionStorageParam();
        setSearchType("");
      }
    } else {
      removeUsersSearchTypeSessionStorageParam();
      setSearchType("");
    }
    return result;
  };

  const findSearchDescription = (searchType) => {
    let result = "";
    const searchDescriptionSessionStorage =
      getUsersSearchDescriptionSessionStorageParam();
    if (searchDescriptionSessionStorage !== null) {
      const searchTypeFound = getSearchTypesValues().filter(
        (searchTypeItem) => searchType === searchTypeItem.type
      )[0];
      if (searchTypeFound !== null) {
        const searchTypePattern = searchTypeFound.pattern;
        const searchDescriptionMatch =
          searchDescriptionSessionStorage.match(searchTypePattern);
        if (
          searchDescriptionMatch !== null &&
          searchDescriptionMatch.length > 0 &&
          searchDescriptionMatch[0] === searchDescriptionSessionStorage
        ) {
          result = searchDescriptionSessionStorage;
          setSearchDescription(searchDescriptionSessionStorage);
        } else {
          removeUsersSearchDescriptionSessionStorageParam();
          removeUsersSearchTypeSessionStorageParam();
          setSearchDescription("");
          setSearchType("");
        }
      } else {
        removeUsersSearchDescriptionSessionStorageParam();
        removeUsersSearchTypeSessionStorageParam();
        setSearchDescription("");
        setSearchType("");
      }
    } else {
      removeUsersSearchDescriptionSessionStorageParam();
      removeUsersSearchTypeSessionStorageParam();
      setSearchDescription("");
      setSearchType("");
    }
    return result;
  };

  const getPaginationUsersByParams = async (
    searchDescription,
    searchType,
    numberPage,
    size,
    sortField,
    sortType
  ) => {
    const token = getJwtTokenLocaleStorageParam();
    validationJwtTokenAdmin(token)
      .then(async (responce) => {
        if (responce.ok) {
          switch (searchType) {
            case SEARCH_TYPE_ID.type:
              getUserByIdQuery(token, searchDescription)
                .then(async (data) => {
                  if (data.status === 204) {
                    setUsersList([]);
                    setUsersSizePageSessionStorageParam(size);
                    setNumberPage(1);
                    setUsersNumberPageSessionStorageParam(1);
                    setMaxNumberPage(1);
                    setUsersMaxNumberPageSessionStorageParam(1);
                    setCountAllEntity(0);
                    setResponceException("");
                    removeUsersSearchDescriptionSessionStorageParam();
                    removeUsersSearchTypeSessionStorageParam();
                    setSearchDescription("");
                    setSearchType("");
                  } else if (data.status === 200) {
                    const response = await data.json();
                    setUsersList(Array.of(response));
                    setUsersSizePageSessionStorageParam(size);
                    setNumberPage(1);
                    setUsersNumberPageSessionStorageParam(1);
                    setMaxNumberPage(1);
                    setUsersMaxNumberPageSessionStorageParam(1);
                    setCountAllEntity(1);
                    setResponceException("");
                    setUsersSearchDescriptionSessionStorageParam(
                      searchDescription
                    );
                    setSearchDescription(searchDescription);
                    setUsersSearchTypeSessionStorageParam(searchType);
                    setSearchType(searchType);
                  } else if (data.status === 401) {
                    const responseJson = await responce.json();
                    setResponceException(responseJson.errorMessage);
                    props.onChangeUserRole(ROLE_GUEST);
                    setUserRoleLocaleStorageParam(ROLE_GUEST);
                    removeJwtTokenLocaleStorageParam();
                  } else if (data.status === 400) {
                    const response = await data.json();
                    setResponceException(response.errorMessage);
                  } else if (data.status === 403) {
                    setResponceException(
                      "У вас не достаточно прав на данную оперцию."
                    );
                  } else {
                    console.log(`Что-то пошло не так: ${responce}`);
                    setResponceException("Что-то пошло не так");
                  }
                })
                .catch(async (error) => {
                  console.log(`Что-то пошло не так: ${error}`);
                  setResponceException("Что-то пошло не так");
                });
              break;
            case SEARCH_TYPE_LOGIN.type:
              getUserByLoginQuery(token, searchDescription)
                .then(async (data) => {
                  if (data.status === 204) {
                    setUsersList([]);
                    setUsersSizePageSessionStorageParam(size);
                    setNumberPage(1);
                    setUsersNumberPageSessionStorageParam(1);
                    setMaxNumberPage(1);
                    setUsersMaxNumberPageSessionStorageParam(1);
                    setCountAllEntity(0);
                    setResponceException("");
                    removeUsersSearchDescriptionSessionStorageParam();
                    removeUsersSearchTypeSessionStorageParam();
                    setSearchDescription("");
                    setSearchType("");
                  } else if (data.status === 200) {
                    const response = await data.json();
                    setUsersList(Array.of(response));
                    setUsersSizePageSessionStorageParam(size);
                    setNumberPage(1);
                    setUsersNumberPageSessionStorageParam(1);
                    setMaxNumberPage(1);
                    setUsersMaxNumberPageSessionStorageParam(1);
                    setCountAllEntity(1);
                    setResponceException("");
                    setUsersSearchDescriptionSessionStorageParam(
                      searchDescription
                    );
                    setSearchDescription(searchDescription);
                    setUsersSearchTypeSessionStorageParam(searchType);
                    setSearchType(searchType);
                  } else if (data.status === 401) {
                    const responseJson = await responce.json();
                    setResponceException(responseJson.errorMessage);
                    props.onChangeUserRole(ROLE_GUEST);
                    setUserRoleLocaleStorageParam(ROLE_GUEST);
                    removeJwtTokenLocaleStorageParam();
                  } else if (data.status === 400) {
                    const response = await data.json();
                    setResponceException(response.errorMessage);
                  } else if (data.status === 403) {
                    setResponceException(
                      "У вас не достаточно прав на данную оперцию."
                    );
                  } else {
                    console.log(`Что-то пошло не так: ${responce}`);
                    setResponceException("Что-то пошло не так");
                  }
                })
                .catch(async (error) => {
                  console.log(`Что-то пошло не так: ${error}`);
                  setResponceException("Что-то пошло не так");
                });
              break;
            case SEARCH_TYPE_ROLE.type:
              getUsersByRoleQuery(
                token,
                searchDescription,
                size,
                numberPage,
                sortField,
                sortType
              )
                .then(async (data) => {
                  if (data.status === 204) {
                    setUsersList([]);
                    setUsersSizePageSessionStorageParam(size);
                    setNumberPage(1);
                    setUsersNumberPageSessionStorageParam(1);
                    setMaxNumberPage(1);
                    setUsersMaxNumberPageSessionStorageParam(1);
                    setCountAllEntity(0);
                    setResponceException("");
                    removeUsersSearchDescriptionSessionStorageParam();
                    removeUsersSearchTypeSessionStorageParam();
                    setSearchDescription("");
                    setSearchType("");
                  } else if (data.status === 200) {
                    const response = await data.json();
                    setUsersList(response.entity);
                    setSize(response.size);
                    setUsersSizePageSessionStorageParam(response.size);
                    setNumberPage(response.numberPage);
                    setUsersNumberPageSessionStorageParam(response.numberPage);
                    setMaxNumberPage(response.maxNumberPage);
                    setUsersMaxNumberPageSessionStorageParam(
                      response.maxNumberPage
                    );
                    setCountAllEntity(response.countAllEntity);
                    setResponceException("");
                    setUsersSearchDescriptionSessionStorageParam(
                      searchDescription
                    );
                    setSearchDescription(searchDescription);
                    setUsersSearchTypeSessionStorageParam(searchType);
                    setSearchType(searchType);
                  } else if (data.status === 401) {
                    const responseJson = await responce.json();
                    setResponceException(responseJson.errorMessage);
                    props.onChangeUserRole(ROLE_GUEST);
                    setUserRoleLocaleStorageParam(ROLE_GUEST);
                    removeJwtTokenLocaleStorageParam();
                  } else if (data.status === 400) {
                    const response = await data.json();
                    setResponceException(response.errorMessage);
                  } else if (data.status === 403) {
                    setResponceException(
                      "У вас не достаточно прав на данную оперцию."
                    );
                  } else {
                    console.log(`Что-то пошло не так: ${responce}`);
                    setResponceException("Что-то пошло не так");
                  }
                })
                .catch(async (error) => {
                  console.log(`Что-то пошло не так: ${error}`);
                  setResponceException("Что-то пошло не так");
                });
              break;
            default:
              getAllUsersQuery(token, size, numberPage, sortField, sortType)
                .then(async (data) => {
                  if (data.status === 204) {
                    setUsersList([]);
                    setUsersSizePageSessionStorageParam(size);
                    setNumberPage(1);
                    setUsersNumberPageSessionStorageParam(1);
                    setMaxNumberPage(1);
                    setUsersMaxNumberPageSessionStorageParam(1);
                    setCountAllEntity(0);
                    setResponceException("");
                    removeUsersSearchDescriptionSessionStorageParam();
                    removeUsersSearchTypeSessionStorageParam();
                    setSearchDescription("");
                    setSearchType("");
                  } else if (data.status === 200) {
                    const response = await data.json();
                    setUsersList(response.entity);
                    setSize(response.size);
                    setUsersSizePageSessionStorageParam(response.size);
                    setNumberPage(response.numberPage);
                    setUsersNumberPageSessionStorageParam(response.numberPage);
                    setMaxNumberPage(response.maxNumberPage);
                    setUsersMaxNumberPageSessionStorageParam(
                      response.maxNumberPage
                    );
                    setCountAllEntity(response.countAllEntity);
                    setResponceException("");
                    removeUsersSearchDescriptionSessionStorageParam();
                    removeUsersSearchTypeSessionStorageParam();
                    setSearchDescription("");
                    setSearchType("");
                  } else if (data.status === 401) {
                    const responseJson = await responce.json();
                    setResponceException(responseJson.errorMessage);
                    props.onChangeUserRole(ROLE_GUEST);
                    setUserRoleLocaleStorageParam(ROLE_GUEST);
                    removeJwtTokenLocaleStorageParam();
                  } else if (data.status === 400) {
                    const response = await data.json();
                    setResponceException(response.errorMessage);
                  } else if (data.status === 403) {
                    setResponceException(
                      "У вас не достаточно прав на данную оперцию."
                    );
                  } else {
                    console.log(`Что-то пошло не так: ${responce}`);
                    setResponceException("Что-то пошло не так");
                  }
                })
                .catch(async (error) => {
                  console.log(`Что-то пошло не так: ${error}`);
                  setResponceException("Что-то пошло не так");
                });
              break;
          }
        } else if (responce.status === 401) {
          const responseJson = await responce.json();
          setResponceException(responseJson.errorMessage);
          props.onChangeUserRole(ROLE_GUEST);
          setUserRoleLocaleStorageParam(ROLE_GUEST);
          removeJwtTokenLocaleStorageParam();
        } else if (responce.status === 403) {
          const responseJson = await responce.json();
          setResponceException(responseJson.errorMessage);
        } else {
          console.log(`Что-то пошло не так: ${responce}`);
          setResponceException("Что-то пошло не так");
        }
      })
      .catch(async (error) => {
        console.log(`Что-то пошло не так: ${error}`);
        setResponceException("Что-то пошло не так");
      });
  };

  if (isNeedInit) {
    setIsNeedInit(false);
    const page = findNumberPage();
    const sizePage = findSizePage();
    const sortField = findSortField();
    const sortType = findSortType();
    const searchType = findSearchType();
    const searchDescription = findSearchDescription(searchType);
    getPaginationUsersByParams(
      searchDescription,
      searchType,
      page,
      sizePage,
      sortField,
      sortType
    );
  }

  const createUserBtn = (
    <div className="ps-5 text-uppercase">
      {userRole === ROLE_ADMIN && (
        <Button
          style={{ height: "47px", width: "max-content" }}
          variant="primary"
          onClick={() => setIsShowModalCreateUserForm(true)}
        >
          {(locale === LOCALE_EN && "Аdd user") ||
            (locale === LOCALE_RU && "Добавить пользователя")}
        </Button>
      )}
    </div>
  );

  const modalCreateUserForm = (
    <Modal
      size="xl"
      show={isShowModalCreateUserForm}
      backdrop="static"
      onHide={() => {
        setResponceException("");
        setIsShowModalCreateUserForm(false);
      }}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title
          className="w-100 pe-5"
          id="example-custom-modal-styling-title"
        >
          <div className="d-flex justify-content-between align-items-center">
            <h3>
              {(locale === LOCALE_EN && "Creating user") ||
                (locale === LOCALE_RU && "Создание пользователя")}
            </h3>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userRole === ROLE_ADMIN && (
          <CreateUserForm
            valueLocale={locale}
            valueUserRole={userRole}
            onCreateUser={() => {
              getPaginationUsersByParams(
                searchDescription,
                searchType,
                numberPage,
                size,
                sortField,
                sortType
              );
              setIsShowModalCreateUserForm(false);
            }}
            onChangeUserRole={(userRole) => props.onChangeUserRole(userRole)}
          />
        )}
      </Modal.Body>
    </Modal>
  );

  return (
    <main style={{ minHeight: "80vh" }}>
      <div className="container">
        <div
          className="d-flex align-items-center justify-content-between pb-4"
          style={{ paddingTop: "40px", height: "auto" }}
        >
          <SearchUsers
            className="w-100"
            onChangeUsersList={(searchDescription, searchType) => {
              getPaginationUsersByParams(
                searchDescription,
                searchType,
                numberPage,
                size,
                sortField,
                sortType
              );
            }}
            valueLocale={locale}
            valueUserRole={userRole}
            valueSearchType={searchType}
          />
          {searchType !== "" && (
            <Button
              className="ms-5"
              variant="primary"
              onClick={() => {
                const searchType = "";
                const searchDescription = "";
                const numberPage = 1;
                setSearchType(searchType);
                setSearchDescription(searchDescription);
                removeUsersSearchTypeSessionStorageParam();
                removeUsersSearchDescriptionSessionStorageParam();
                getPaginationUsersByParams(
                  searchDescription,
                  searchType,
                  numberPage,
                  size,
                  sortField,
                  sortType
                );
              }}
            >
              {(locale === LOCALE_EN && "Reset search") ||
                (locale === LOCALE_RU && "Сбросить поиск")}
            </Button>
          )}
          {userRole === ROLE_ADMIN && (
            <div>
              <div>{createUserBtn}</div>
              <div>{modalCreateUserForm}</div>
            </div>
          )}
        </div>
        {searchType !== "" && (
          <div>
            <h5>
              {(locale === LOCALE_EN && "Search parameters: ") ||
                (locale === LOCALE_RU && "Параметры поиска: ")}
              {(searchType === SEARCH_TYPE_ID.type &&
                ((locale === LOCALE_RU && `по номеру пользователя`) ||
                  (locale === LOCALE_EN && `by user number`))) ||
                (searchType === SEARCH_TYPE_LOGIN.type &&
                  ((locale === LOCALE_RU && `по логину пользователя`) ||
                    (locale === LOCALE_EN && `by login of user`))) ||
                (searchType === SEARCH_TYPE_ROLE.type &&
                  ((locale === LOCALE_RU && `по роли пользователя`) ||
                    (locale === LOCALE_EN && `by role of user`)))}
              ={searchDescription}
            </h5>
          </div>
        )}
        <h2>
          {countAllEntity}{" "}
          {(locale === LOCALE_RU && `Пользователей`) ||
            (locale === LOCALE_EN && `Users`)}
        </h2>
        {responceException.length === 0 && usersList.length > 0 && (
          <UsersList
            valueUserRole={userRole}
            valueLocale={locale}
            valueUsersList={usersList}
            valueSortType={sortType}
            valueSortField={sortField}
            onChangeUserRole={(userRole) => props.onChangeUserRole(userRole)}
            onChangeUser={() =>
              getPaginationUsersByParams(
                searchDescription,
                searchType,
                numberPage,
                size,
                sortField,
                sortType
              )
            }
            onChangeSorting={(sortField, sortType) => {
              const numberPage = 1;
              setSortField(sortField);
              setSortType(sortType);
              getPaginationUsersByParams(
                searchDescription,
                searchType,
                numberPage,
                size,
                sortField,
                sortType
              );
            }}
          />
        )}
        {responceException.length === 0 && usersList.length === 0 && (
          <div
            className="text-center d-flex justify-content-center align-items-center pb-5"
            style={{
              minHeight: "60vh",
              flexDirection: "column",
            }}
          >
            <h2 className="text-center mb-5">
              {(locale === LOCALE_RU &&
                `По выбранным критериям не найдено пользователей`) ||
                (locale === LOCALE_EN &&
                  `No users found according to the selected criteria`)}
            </h2>
            <button
              onClick={() => {
                const searchDescription = "";
                const searchType = "";
                getPaginationUsersByParams(
                  searchDescription,
                  searchType,
                  DEFAULT_NUMBER_PAGE,
                  DEFAULT_SIZE_PAGE,
                  DEFAULT_SORT_FIELD,
                  DEFAULT_SORT_TYPE
                );
              }}
              className="btn btn-primary"
            >
              <h5 style={{ margin: 0, padding: "10px 20px" }}>
                {(locale === LOCALE_RU && `Показать всех пользователей`) ||
                  (locale === LOCALE_EN && `Show all users`)}
              </h5>
            </button>
          </div>
        )}
        {responceException.length === 0 && usersList.length > 0 && (
          <UsersPagination
            valueNumberPage={numberPage}
            valueMaxNumberPage={maxNumberPage}
            valueSize={size}
            onChoosedNumberPage={(numberPage) => {
              getPaginationUsersByParams(
                searchDescription,
                searchType,
                numberPage,
                size,
                sortField,
                sortType
              );
            }}
            onChoosedSize={(size) => {
              getPaginationUsersByParams(
                searchDescription,
                searchType,
                DEFAULT_NUMBER_PAGE,
                size,
                sortField,
                searchType
              );
            }}
          />
        )}
      </div>
    </main>
  );
};

export default UsersContentSection;
