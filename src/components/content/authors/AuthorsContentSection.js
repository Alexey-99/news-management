import { useState } from "react";
import {
  getAuthorsNumberPageLocalStorageParam,
  getAuthorsSearchDescriptionLocalStorageParam,
  getAuthorsSearchTypeLocalStorageParam,
  getAuthorsSizePageLocalStorageParam,
  getAuthorsSortFieldLocalStorageParam,
  getAuthorsSortTypeLocalStorageParam,
  removeAuthorsSearchDescriptionLocalStorageParam,
  removeAuthorsSearchTypeLocalStorageParam,
  setAuthorsMaxNumberPageLocalStorageParam,
  setAuthorsNumberPageLocalStorageParam,
  setAuthorsSearchDescriptionLocalStorageParam,
  setAuthorsSearchTypeLocalStorageParam,
  setAuthorsSizePageLocalStorageParam,
  setAuthorsSortFieldLocalStorageParam,
  setAuthorsSortTypeLocalStorageParam,
} from "../../../params/LocaleStorageParams";
import { PAGE_SIZE_VALUES } from "./components/pagination/PageSizeValues";
import {
  getAllAuthorsQuery,
  getAuthorByIdQuery,
  getAuthorByNewsIdQuery,
  getAuthorsByPartOfNameQuery,
} from "../../../query/Author";
import {
  SEARCH_TYPE_ID,
  SEARCH_TYPE_NEWS_ID,
  SEARCH_TYPE_PART_OF_NAME,
  getSearchTypesValues,
} from "./components/search/type/SearchType";
import { ROLE_ADMIN } from "../../../role/UserRole";
import { Button, Modal } from "react-bootstrap";
import SearchAuthors from "./components/search/SearchAuthors";
import { ASC, DESC } from "./components/sort/SortType";
import AuthorsList from "./components/content/AuthorsList";
import CreateAuthorForm from "./components/form/CreateAuthorForm";
import {
  AUTHOR_COUNT_NEWS,
  AUTHOR_ID,
  AUTHOR_NAME,
} from "./components/sort/SortField";
import AuthorPagination from "./components/pagination/AuthorPagination";
import { LOCALE_EN, LOCALE_RU } from "../../../locate/Locale";

const AuthorsContentSection = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;

  const DEFAULT_NUMBER_PAGE = 1;
  const DEFAULT_SIZE_PAGE = PAGE_SIZE_VALUES[0];
  const DEFAULT_SORT_FIELD = AUTHOR_NAME;
  const DEFAULT_SORT_TYPE = ASC;

  const [searchDescription, setSearchDescription] = useState("");
  const [searchDescriptionPattern, setSearchDescriptionPattern] = useState("");
  const [searchType, setSearchType] = useState("");

  const [authorsList, setAuthorsList] = useState([]);

  const [numberPage, setNumberPage] = useState(DEFAULT_NUMBER_PAGE);
  const [size, setSize] = useState(DEFAULT_SIZE_PAGE);
  const [maxNumberPage, setMaxNumberPage] = useState(DEFAULT_NUMBER_PAGE);
  const [countAllEntity, setCountAllEntity] = useState();
  const [sortField, setSortField] = useState(DEFAULT_SORT_FIELD);
  const [sortType, setSortType] = useState(DEFAULT_SORT_TYPE);
  const [isNeedInit, setIsNeedInit] = useState(true);
  const [responceException, setResponceException] = useState("");
  const [isShowModalCreateAuthorForm, setIsShowModalCreateAuthorForm] =
    useState(false);

  const findNumberPage = () => {
    const pageLocalStorage = getAuthorsNumberPageLocalStorageParam();
    if (pageLocalStorage !== null) {
      const numberPageMatchArray = pageLocalStorage.match("\\d+");
      if (
        numberPageMatchArray !== null &&
        numberPageMatchArray[0] !== null &&
        numberPageMatchArray[0] === pageLocalStorage
      ) {
        setNumberPage(pageLocalStorage);
        return pageLocalStorage;
      } else {
        setAuthorsNumberPageLocalStorageParam(DEFAULT_NUMBER_PAGE);
        setNumberPage(DEFAULT_NUMBER_PAGE);
        return DEFAULT_NUMBER_PAGE;
      }
    } else {
      setAuthorsNumberPageLocalStorageParam(DEFAULT_NUMBER_PAGE);
      setNumberPage(DEFAULT_NUMBER_PAGE);
      return DEFAULT_NUMBER_PAGE;
    }
  };

  const findSizePage = () => {
    const sizePageLocalStorage = getAuthorsSizePageLocalStorageParam();
    const isFoundSize =
      PAGE_SIZE_VALUES.filter((value) => value == sizePageLocalStorage).length >
      0;
    if (isFoundSize) {
      setSize(sizePageLocalStorage);
      return sizePageLocalStorage;
    } else {
      setAuthorsSizePageLocalStorageParam(DEFAULT_SIZE_PAGE);
      setSize(DEFAULT_SIZE_PAGE);
      return DEFAULT_SIZE_PAGE;
    }
  };

  const findSortField = () => {
    let result = DEFAULT_SORT_FIELD;
    const sortFieldSessionStorage = getAuthorsSortFieldLocalStorageParam();
    if (sortFieldSessionStorage != null && sortFieldSessionStorage !== "") {
      if (AUTHOR_NAME === sortFieldSessionStorage) {
        setSortField(AUTHOR_NAME);
        result = AUTHOR_NAME;
      } else if (AUTHOR_ID === sortFieldSessionStorage) {
        setSortField(AUTHOR_ID);
        result = AUTHOR_ID;
      } else if (AUTHOR_COUNT_NEWS === sortFieldSessionStorage) {
        setSortField(AUTHOR_COUNT_NEWS);
        result = AUTHOR_COUNT_NEWS;
      } else {
        setSortField(DEFAULT_SORT_FIELD);
        setAuthorsSortFieldLocalStorageParam(DEFAULT_SORT_FIELD);
      }
    } else {
      setSortField(DEFAULT_SORT_FIELD);
      setAuthorsSortFieldLocalStorageParam(DEFAULT_SORT_FIELD);
    }
    return result;
  };

  const findSortType = () => {
    let result = DEFAULT_SORT_TYPE;
    const sortTypeSessionStorage = getAuthorsSortTypeLocalStorageParam();
    if (sortTypeSessionStorage != null && sortTypeSessionStorage !== "") {
      if (ASC === sortTypeSessionStorage) {
        setSortType(ASC);
        result = ASC;
      } else if (DESC === sortTypeSessionStorage) {
        setSortType(DESC);
        result = DESC;
      } else {
        setSortType(DEFAULT_SORT_TYPE);
        setAuthorsSortTypeLocalStorageParam(DEFAULT_SORT_TYPE);
      }
    } else {
      setSortType(DEFAULT_SORT_TYPE);
      setAuthorsSortTypeLocalStorageParam(DEFAULT_SORT_TYPE);
    }
    return result;
  };

  const findSearchType = () => {
    let result = "";
    const searchTypeSessionStorage = getAuthorsSearchTypeLocalStorageParam();
    if (searchTypeSessionStorage !== null) {
      const foundSearchType = getSearchTypesValues().filter(
        (searchType) => searchTypeSessionStorage === searchType.type
      )[0];
      if (findNumberPage !== null) {
        result = searchTypeSessionStorage;
        setSearchDescriptionPattern(foundSearchType.pattern);
        setSearchType(foundSearchType.type);
      } else {
        removeAuthorsSearchTypeLocalStorageParam();
        setSearchType("");
      }
    } else {
      removeAuthorsSearchTypeLocalStorageParam();
      setSearchType("");
    }
    return result;
  };

  const findSearchDescription = (searchType) => {
    let result = "";
    const searchDescriptionSessionStorage =
      getAuthorsSearchDescriptionLocalStorageParam();
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
          removeAuthorsSearchDescriptionLocalStorageParam();
          removeAuthorsSearchTypeLocalStorageParam();
          setSearchDescription("");
          setSearchType("");
        }
      } else {
        removeAuthorsSearchDescriptionLocalStorageParam();
        removeAuthorsSearchTypeLocalStorageParam();
        setSearchDescription("");
        setSearchType("");
      }
    } else {
      removeAuthorsSearchDescriptionLocalStorageParam();
      removeAuthorsSearchTypeLocalStorageParam();
      setSearchDescription("");
      setSearchType("");
    }
    return result;
  };

  const getPaginationAuthorsByParams = async (
    searchDescription,
    searchType,
    numberPage,
    size,
    sortField,
    sortType
  ) => {
    switch (searchType) {
      case SEARCH_TYPE_ID.type:
        getAuthorByIdQuery(searchDescription)
          .then(async (data) => {
            if (data.status === 204) {
              setAuthorsList([]);
              setAuthorsSizePageLocalStorageParam(size);
              setNumberPage(1);
              setAuthorsNumberPageLocalStorageParam(1);
              setMaxNumberPage(1);
              setAuthorsMaxNumberPageLocalStorageParam(1);
              setCountAllEntity(0);
              setResponceException("");
              removeAuthorsSearchDescriptionLocalStorageParam();
              removeAuthorsSearchTypeLocalStorageParam();
              setSearchDescription("");
              setSearchType("");
            } else if (data.status === 200) {
              const response = await data.json();
              setAuthorsList(Array.of(response));
              setAuthorsSizePageLocalStorageParam(size);
              setNumberPage(1);
              setAuthorsNumberPageLocalStorageParam(1);
              setMaxNumberPage(1);
              setAuthorsMaxNumberPageLocalStorageParam(1);
              setCountAllEntity(1);
              setResponceException("");
              setAuthorsSearchDescriptionLocalStorageParam(searchDescription);
              setSearchDescription(searchDescription);
              setAuthorsSearchTypeLocalStorageParam(searchType);
              setSearchType(searchType);
            } else if (data.status === 401) {
              setResponceException("Вы не авторизованы");
            } else if (data.status === 400) {
              const response = await data.json();
              setResponceException(response.errorMessage);
            } else if (data.status === 403) {
              setResponceException(
                "У вас не достаточно прав на данную оперцию."
              );
            } else {
              setResponceException("Что-то пошло не так");
            }
          })
          .catch(() => {
            setResponceException("Что-то пошло не так");
          });
        break;
      case SEARCH_TYPE_NEWS_ID.type:
        getAuthorByNewsIdQuery(
          searchDescription,
          size,
          numberPage,
          sortField,
          sortType
        )
          .then(async (data) => {
            if (data.status === 204) {
              setAuthorsList([]);
              setAuthorsSizePageLocalStorageParam(size);
              setNumberPage(1);
              setAuthorsNumberPageLocalStorageParam(1);
              setMaxNumberPage(1);
              setAuthorsMaxNumberPageLocalStorageParam(1);
              setCountAllEntity(0);
              setResponceException("");
              removeAuthorsSearchDescriptionLocalStorageParam();
              removeAuthorsSearchTypeLocalStorageParam();
              setSearchDescription("");
              setSearchType("");
            } else if (data.status === 200) {
              const response = await data.json();
              setAuthorsList(Array.of(response));
              setAuthorsSizePageLocalStorageParam(size);
              setNumberPage(1);
              setAuthorsNumberPageLocalStorageParam(1);
              setMaxNumberPage(1);
              setAuthorsMaxNumberPageLocalStorageParam(1);
              setCountAllEntity(1);
              setResponceException("");
              setAuthorsSearchDescriptionLocalStorageParam(searchDescription);
              setSearchDescription(searchDescription);
              setAuthorsSearchTypeLocalStorageParam(searchType);
              setSearchType(searchType);
            } else if (data.status === 401) {
              setResponceException("Вы не авторизованы");
            } else if (data.status === 400) {
              const response = await data.json();
              setResponceException(response.errorMessage);
            } else if (data.status === 403) {
              setResponceException(
                "У вас не достаточно прав на данную оперцию."
              );
            } else {
              setResponceException("Что-то пошло не так");
            }
          })
          .catch(() => {
            setResponceException("Что-то пошло не так");
          });
        break;
      case SEARCH_TYPE_PART_OF_NAME.type:
        getAuthorsByPartOfNameQuery(
          searchDescription,
          size,
          numberPage,
          sortField,
          sortType
        )
          .then(async (data) => {
            if (data.status === 204) {
              setAuthorsList([]);
              setAuthorsSizePageLocalStorageParam(size);
              setNumberPage(1);
              setAuthorsNumberPageLocalStorageParam(1);
              setMaxNumberPage(1);
              setAuthorsMaxNumberPageLocalStorageParam(1);
              setCountAllEntity(0);
              setResponceException("");
              removeAuthorsSearchDescriptionLocalStorageParam();
              removeAuthorsSearchTypeLocalStorageParam();
              setSearchDescription("");
              setSearchType("");
            } else if (data.status === 200) {
              const response = await data.json();
              setAuthorsList(response.entity);
              setSize(response.size);
              setAuthorsSizePageLocalStorageParam(response.size);
              setNumberPage(response.numberPage);
              setAuthorsNumberPageLocalStorageParam(response.numberPage);
              setMaxNumberPage(response.maxNumberPage);
              setAuthorsMaxNumberPageLocalStorageParam(response.maxNumberPage);
              setCountAllEntity(response.countAllEntity);
              setResponceException("");
              setAuthorsSearchDescriptionLocalStorageParam(searchDescription);
              setSearchDescription(searchDescription);
              setAuthorsSearchTypeLocalStorageParam(searchType);
              setSearchType(searchType);
            } else if (data.status === 401) {
              setResponceException("Вы не авторизованы");
            } else if (data.status === 400) {
              const response = await data.json();
              setResponceException(response.errorMessage);
            } else if (data.status === 403) {
              setResponceException(
                "У вас не достаточно прав на данную оперцию."
              );
            } else {
              setResponceException("Что-то пошло не так");
            }
          })
          .catch(() => {
            setResponceException("Что-то пошло не так");
          });
        break;
      default:
        getAllAuthorsQuery(size, numberPage, sortField, sortType)
          .then(async (data) => {
            if (data.status === 204) {
              setAuthorsList([]);
              setAuthorsSizePageLocalStorageParam(size);
              setNumberPage(1);
              setAuthorsNumberPageLocalStorageParam(1);
              setMaxNumberPage(1);
              setAuthorsMaxNumberPageLocalStorageParam(1);
              setCountAllEntity(0);
              setResponceException("");
              removeAuthorsSearchDescriptionLocalStorageParam();
              removeAuthorsSearchTypeLocalStorageParam();
              setSearchDescription("");
              setSearchType("");
            } else if (data.status === 200) {
              const response = await data.json();
              setAuthorsList(response.entity);
              setSize(response.size);
              setAuthorsSizePageLocalStorageParam(response.size);
              setNumberPage(response.numberPage);
              setAuthorsNumberPageLocalStorageParam(response.numberPage);
              setMaxNumberPage(response.maxNumberPage);
              setAuthorsMaxNumberPageLocalStorageParam(response.maxNumberPage);
              setCountAllEntity(response.countAllEntity);
              setResponceException("");
              removeAuthorsSearchDescriptionLocalStorageParam();
              removeAuthorsSearchTypeLocalStorageParam();
              setSearchDescription("");
              setSearchType("");
            } else if (data.status === 401) {
              setResponceException("Вы не авторизованы");
            } else if (data.status === 400) {
              const response = await data.json();
              setResponceException(response.errorMessage);
            } else if (data.status === 403) {
              setResponceException(
                "У вас не достаточно прав на данную оперцию."
              );
            } else {
              setResponceException("Что-то пошло не так");
            }
          })
          .catch(() => {
            setResponceException("Что-то пошло не так");
          });
        break;
    }
  };

  if (isNeedInit) {
    setIsNeedInit(false);
    const page = findNumberPage();
    const sizePage = findSizePage();
    const sortField = findSortField();
    const sortType = findSortType();
    const searchType = findSearchType();
    const searchDescription = findSearchDescription(searchType);
    getPaginationAuthorsByParams(
      searchDescription,
      searchType,
      page,
      sizePage,
      sortField,
      sortType
    );
  }

  const createAuthorBtn = (
    <div className="ps-5 text-uppercase">
      <Button
        style={{ height: "47px", width: "max-content" }}
        variant="primary"
        onClick={() => setIsShowModalCreateAuthorForm(true)}
      >
        {(locale === LOCALE_EN && "Аdd author") ||
          (locale === LOCALE_RU && "Добавить автора")}
      </Button>
    </div>
  );

  const modalCreateAuthorForm = (
    <Modal
      size="xl"
      show={isShowModalCreateAuthorForm}
      backdrop="static"
      onHide={() => {
        setResponceException("");
        setIsShowModalCreateAuthorForm(false);
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
              {(locale === LOCALE_EN && "Creating author") ||
                (locale === LOCALE_RU && "Создание автора")}
            </h3>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateAuthorForm
          valueLocale={locale}
          valueUserRole={userRole}
          onCreateAuthors={() => {
            getPaginationAuthorsByParams(
              searchDescription,
              searchType,
              numberPage,
              size,
              sortField,
              sortType
            );
            setIsShowModalCreateAuthorForm(false);
          }}
          onChangeUserRole={(userRole) => props.onChangeUserRole(userRole)}
        />
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
          <SearchAuthors
            className="w-100"
            onChangeAuthorsList={(searchDescription, searchType) => {
              getPaginationAuthorsByParams(
                searchDescription,
                searchType,
                DEFAULT_NUMBER_PAGE,
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
                removeAuthorsSearchTypeLocalStorageParam();
                removeAuthorsSearchDescriptionLocalStorageParam();
                getPaginationAuthorsByParams(
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
              <div>{createAuthorBtn}</div>
              <div>{modalCreateAuthorForm}</div>
            </div>
          )}
        </div>
        {searchType !== "" && (
          <div>
            <h5>
              {(locale === LOCALE_EN && "Search parameters: ") ||
                (locale === LOCALE_RU && "Параметры поиска: ")}
              {(searchType === SEARCH_TYPE_ID.type &&
                ((locale === LOCALE_RU && `по номеру автора`) ||
                  (locale === LOCALE_EN && `by author number`))) ||
                (searchType === SEARCH_TYPE_NEWS_ID.type &&
                  ((locale === LOCALE_RU && `по номеру новости`) ||
                    (locale === LOCALE_EN && `by news number`))) ||
                (searchType === SEARCH_TYPE_PART_OF_NAME.type &&
                  ((locale === LOCALE_RU && `по части имени автора`) ||
                    (locale === LOCALE_EN && `by part of author name`)))}
              ={searchDescription}
            </h5>
          </div>
        )}
        <h2>
          {countAllEntity}{" "}
          {(locale === LOCALE_RU && `Автора(ов)`) ||
            (locale === LOCALE_EN && `Authors`)}
        </h2>
        {responceException.length === 0 && authorsList.length > 0 && (
          <AuthorsList
            valueUserRole={userRole}
            valueLocale={locale}
            valueAuthorsList={authorsList}
            valueSortType={sortType}
            valueSortField={sortField}
            onChangeUserRole={(userRole) => props.onChangeUserRole(userRole)}
            onChangeAuthor={() =>
              getPaginationAuthorsByParams(
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
              getPaginationAuthorsByParams(
                searchDescription,
                searchType,
                DEFAULT_NUMBER_PAGE,
                size,
                sortField,
                sortType
              );
            }}
          />
        )}
        {responceException.length === 0 && authorsList.length === 0 && (
          <div
            className="text-center d-flex justify-content-center align-items-center pb-5"
            style={{
              minHeight: "60vh",
              flexDirection: "column",
            }}
          >
            <h2 className="text-center mb-5">
              {(locale === LOCALE_RU &&
                `По выбранным критериям авторов не найдено`) ||
                (locale === LOCALE_EN &&
                  `No authors found according to the selected criteria`)}
            </h2>
            <button
              onClick={() => {
                const searchDescription = "";
                const searchType = "";
                getPaginationAuthorsByParams(
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
                {(locale === LOCALE_RU && `Показать все авторов`) ||
                  (locale === LOCALE_EN && `Show all authors`)}
              </h5>
            </button>
          </div>
        )}
        {responceException.length === 0 && authorsList.length > 0 && (
          <AuthorPagination
            valueNumberPage={numberPage}
            valueMaxNumberPage={maxNumberPage}
            valueSize={size}
            onChoosedNumberPage={(numberPage) => {
              getPaginationAuthorsByParams(
                searchDescription,
                searchType,
                numberPage,
                size,
                sortField,
                sortType
              );
            }}
            onChoosedSize={(size) => {
              getPaginationAuthorsByParams(
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

export default AuthorsContentSection;
