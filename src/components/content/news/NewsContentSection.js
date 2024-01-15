import NewsList from "../news/components/content/NewsList";
import NewsPagination from "../news/components/pagination/NewsPagination";
import SearchNews from "./components/search/SearchNews";
import SortFieldSelect from "./components/sort/selecte/SortFieldSelect";
import SortTypeSelect from "./components/sort/selecte/SortTypeSelect";
import React, { useState } from "react";
import { CREATED_DATE, MODIFIED_DATE } from "./components/sort/SortField";
import { ASC, DESC } from "./components/sort/SortType";
import { ROLE_ADMIN, ROLE_USER } from "../../../role/UserRole";
import {
  SEARCH_TYPE_AUTHOR_ID,
  SEARCH_TYPE_AUTHOR_NAME,
  SEARCH_TYPE_ID,
  SEARCH_TYPE_PART_OF_CONTENT,
  SEARCH_TYPE_PART_OF_TITLE,
  SEARCH_TYPE_TAG_ID,
  SEARCH_TYPE_TAG_NAME,
  getSearchTypesValues,
} from "./components/search/type/SearchType";
import {
  getAllNewsQuery,
  getNewsByAuthorIdQuary,
  getNewsByIdQuary,
  getNewsByPartOfAuthorNameQuary,
  getNewsByPartOfContentQuary,
  getNewsByPartOfTitleQuary,
  getNewsByTagIdQuary,
  getNewsByTagNameQuary,
} from "../../../query/News";
import { Button, Modal } from "react-bootstrap";
import CreateNewsForm from "./components/content/components/form/CreateNewsForm";
import { PAGE_SIZE_VALUES } from "./components/pagination/PageSizeValues";
import { LOCALE_EN, LOCALE_RU } from "../../../locate/Locale";
import { updateAuthorQuery } from "../../../query/Author";
import {
  getNewsNumberPageLocaleStorageParam,
  getNewsSearchDescriptionLocaleStorageParam,
  getNewsSearchTypeLocaleStorageParam,
  getNewsSizePageLocaleStorageParam,
  getNewsSortFieldLocaleStorageParam,
  getNewsSortTypeLocaleStorageParam,
  removeNewsSearchDescriptionLocaleStorageParam,
  removeNewsSearchTypeLocaleStorageParam,
  setNewsMaxNumberPageLocaleStorageParam,
  setNewsNumberPageLocaleStorageParam,
  setNewsSearchDescriptionLocaleStorageParam,
  setNewsSearchTypeLocaleStorageParam,
  setNewsSizePageLocaleStorageParam,
  setNewsSortFieldLocaleStorageParam,
  setNewsSortTypeLocaleStorageParam,
} from "../../../params/LocaleStorageParams";

const NewsContentSection = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;
  const expiredDateJwtToken = props.valueExpiredDateJwtToken;

  const DEFAULT_NUMBER_PAGE = 1;
  const DEFAULT_SIZE_PAGE = PAGE_SIZE_VALUES[0];
  const DEFAULT_SORT_FIELD = MODIFIED_DATE;
  const DEFAULT_SORT_TYPE = DESC;

  const [searchDescription, setSearchDescription] = useState("");
  const [searchDescriptionPattern, setSearchDescriptionPattern] = useState("");
  const [searchType, setSearchType] = useState("");

  const [newsList, setNewsList] = useState([]);

  const [numberPage, setNumberPage] = useState(DEFAULT_NUMBER_PAGE);
  const [size, setSize] = useState(DEFAULT_SIZE_PAGE);
  const [maxNumberPage, setMaxNumberPage] = useState(DEFAULT_NUMBER_PAGE);
  const [countAllEntity, setCountAllEntity] = useState();
  const [sortField, setSortField] = useState(DEFAULT_SORT_FIELD);
  const [sortType, setSortType] = useState(DEFAULT_SORT_TYPE);
  const [isNeedInit, setIsNeedInit] = useState(true);
  const [responceException, setResponceException] = useState("");
  const [isShowModalCreateNewsForm, setIsShowModalCreateNewsForm] =
    useState(false);

  const findNumberPage = () => {
    const pageSessionStorage = getNewsNumberPageLocaleStorageParam();
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
        setNewsNumberPageLocaleStorageParam(DEFAULT_NUMBER_PAGE);
        setNumberPage(DEFAULT_NUMBER_PAGE);
        return DEFAULT_NUMBER_PAGE;
      }
    } else {
      setNewsNumberPageLocaleStorageParam(DEFAULT_NUMBER_PAGE);
      setNumberPage(DEFAULT_NUMBER_PAGE);
      return DEFAULT_NUMBER_PAGE;
    }
  };

  const findSizePage = () => {
    const newsSizePageSessionStorage = getNewsSizePageLocaleStorageParam();
    const isFoundSize =
      PAGE_SIZE_VALUES.filter((value) => value == newsSizePageSessionStorage)
        .length > 0;
    if (isFoundSize) {
      setSize(newsSizePageSessionStorage);
      return newsSizePageSessionStorage;
    } else {
      setNewsSizePageLocaleStorageParam(DEFAULT_SIZE_PAGE);
      setSize(DEFAULT_SIZE_PAGE);
      return DEFAULT_SIZE_PAGE;
    }
  };

  const findSortField = () => {
    let result = DEFAULT_SORT_FIELD;
    const newsSortFieldSessionStorage = getNewsSortFieldLocaleStorageParam();
    if (
      newsSortFieldSessionStorage != null &&
      newsSortFieldSessionStorage !== ""
    ) {
      if (CREATED_DATE === newsSortFieldSessionStorage) {
        setSortField(CREATED_DATE);
        result = CREATED_DATE;
      } else if (MODIFIED_DATE === newsSortFieldSessionStorage) {
        setSortField(MODIFIED_DATE);
        result = MODIFIED_DATE;
      } else {
        setSortField(DEFAULT_SORT_FIELD);
        setNewsSortFieldLocaleStorageParam(DEFAULT_SORT_FIELD);
      }
    } else {
      setSortField(DEFAULT_SORT_FIELD);
      setNewsSortFieldLocaleStorageParam(DEFAULT_SORT_FIELD);
    }
    return result;
  };

  const findSortType = () => {
    let result = DEFAULT_SORT_TYPE;
    const newsSortTypeSessionStorage = getNewsSortTypeLocaleStorageParam();
    if (
      newsSortTypeSessionStorage != null &&
      newsSortTypeSessionStorage !== ""
    ) {
      if (ASC === newsSortTypeSessionStorage) {
        setSortType(ASC);
        result = ASC;
      } else if (DESC === newsSortTypeSessionStorage) {
        setSortType(DESC);
        result = DESC;
      } else {
        setSortType(DEFAULT_SORT_TYPE);
        setNewsSortTypeLocaleStorageParam(DEFAULT_SORT_TYPE);
      }
    } else {
      setSortType(DEFAULT_SORT_TYPE);
      setNewsSortTypeLocaleStorageParam(DEFAULT_SORT_TYPE);
    }
    return result;
  };

  const findSearchType = () => {
    let result = "";
    const searchTypeSessionStorage = getNewsSearchTypeLocaleStorageParam();
    if (searchTypeSessionStorage !== null) {
      const foundSearchType = getSearchTypesValues().filter(
        (searchType) => searchTypeSessionStorage === searchType.type
      )[0];
      if (findNumberPage !== null) {
        result = searchTypeSessionStorage;
        setSearchDescriptionPattern(foundSearchType.pattern);
        setSearchType(foundSearchType.type);
      } else {
        removeNewsSearchTypeLocaleStorageParam();
        setSearchType("");
      }
    } else {
      removeNewsSearchTypeLocaleStorageParam();
      setSearchType("");
    }
    return result;
  };

  const findSearchDescription = (searchType) => {
    let result = "";
    const searchDescriptionSessionStorage =
      getNewsSearchDescriptionLocaleStorageParam();
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
          removeNewsSearchDescriptionLocaleStorageParam();
          removeNewsSearchTypeLocaleStorageParam();
          setSearchDescription("");
          setSearchType("");
        }
      } else {
        removeNewsSearchDescriptionLocaleStorageParam();
        removeNewsSearchTypeLocaleStorageParam();
        setSearchDescription("");
        setSearchType("");
      }
    } else {
      removeNewsSearchDescriptionLocaleStorageParam();
      removeNewsSearchTypeLocaleStorageParam();
      setSearchDescription("");
      setSearchType("");
    }
    return result;
  };

  const updateJwtToken = (token) => {
    updateAuthorQuery(token)
      .then(async (response) => {
        if (response.ok) {
        } else if (response.status === 200) {
          const responseJson = await response.json();
          setNewsList(Array.of(responseJson));
          setNewsSizePageLocaleStorageParam(size);
          setNumberPage(1);
          setNewsNumberPageLocaleStorageParam(1);
          setMaxNumberPage(1);
          setNewsMaxNumberPageLocaleStorageParam(1);
          setCountAllEntity(1);
          setResponceException("");
          setNewsSearchDescriptionLocaleStorageParam(searchDescription);
          setSearchDescription(searchDescription);
          setNewsSearchTypeLocaleStorageParam(searchType);
          setSearchType(searchType);
        } else if (response.status === 401) {
          setResponceException("Вы не авторизованы");
        } else if (response.status === 400) {
          const responseJson = await response.json();
          setResponceException(responseJson.errorMessage);
        } else if (response.status === 403) {
          setResponceException("У вас не достаточно прав на данную оперцию.");
        } else {
          setResponceException("Что-то пошло не так");
        }
      })
      .catch(() => {
        setResponceException("Что-то пошло не так");
      });
  };

  const getPaginationNewsByParams = async (
    searchDescription,
    searchType,
    numberPage,
    size,
    sortField,
    sortType
  ) => {
    console.log(expiredDateJwtToken);
    console.log(expiredDateJwtToken - new Date());
    console.log(expiredDateJwtToken - new Date() - 10000);

    switch (searchType) {
      case SEARCH_TYPE_ID.type:
        getNewsByIdQuary(searchDescription)
          .then(async (data) => {
            if (data.status === 204) {
              setNewsList([]);
              setNewsSizePageLocaleStorageParam(size);
              setNumberPage(1);
              setNewsNumberPageLocaleStorageParam(1);
              setMaxNumberPage(1);
              setNewsMaxNumberPageLocaleStorageParam(1);
              setCountAllEntity(0);
              setResponceException("");
              removeNewsSearchDescriptionLocaleStorageParam();
              removeNewsSearchTypeLocaleStorageParam();
              setSearchDescription("");
              setSearchType("");
            } else if (data.status === 200) {
              const response = await data.json();
              setNewsList(Array.of(response));
              setNewsSizePageLocaleStorageParam(size);
              setNumberPage(1);
              setNewsNumberPageLocaleStorageParam(1);
              setMaxNumberPage(1);
              setNewsMaxNumberPageLocaleStorageParam(1);
              setCountAllEntity(1);
              setResponceException("");
              setNewsSearchDescriptionLocaleStorageParam(searchDescription);
              setSearchDescription(searchDescription);
              setNewsSearchTypeLocaleStorageParam(searchType);
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
      case SEARCH_TYPE_TAG_NAME.type:
        getNewsByTagNameQuary(
          searchDescription,
          size,
          numberPage,
          sortField,
          sortType
        )
          .then(async (data) => {
            if (data.status === 204) {
              setNewsList([]);
              setNewsSizePageLocaleStorageParam(size);
              setNumberPage(1);
              setNewsNumberPageLocaleStorageParam(1);
              setMaxNumberPage(1);
              setNewsMaxNumberPageLocaleStorageParam(1);
              setCountAllEntity(0);
              setResponceException("");
              removeNewsSearchDescriptionLocaleStorageParam();
              removeNewsSearchTypeLocaleStorageParam();
              setSearchDescription("");
              setSearchType("");
            } else if (data.status === 200) {
              const response = await data.json();
              setNewsList(response.entity);
              setSize(response.size);
              setNewsSizePageLocaleStorageParam(response.size);
              setNumberPage(response.numberPage);
              setNewsNumberPageLocaleStorageParam(response.numberPage);
              setMaxNumberPage(response.maxNumberPage);
              setNewsMaxNumberPageLocaleStorageParam(response.maxNumberPage);
              setCountAllEntity(response.countAllEntity);
              setResponceException("");
              setNewsSearchDescriptionLocaleStorageParam(searchDescription);
              setSearchDescription(searchDescription);
              setNewsSearchTypeLocaleStorageParam(searchType);
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
      case SEARCH_TYPE_TAG_ID.type:
        getNewsByTagIdQuary(
          searchDescription,
          size,
          numberPage,
          sortField,
          sortType
        ).then(async (data) => {
          if (data.status === 204) {
            setNewsList([]);
            setNewsSizePageLocaleStorageParam(size);
            setNumberPage(1);
            setNewsNumberPageLocaleStorageParam(1);
            setMaxNumberPage(1);
            setNewsMaxNumberPageLocaleStorageParam(1);
            setCountAllEntity(0);
            setResponceException("");
            removeNewsSearchDescriptionLocaleStorageParam();
            removeNewsSearchTypeLocaleStorageParam();
            setSearchDescription("");
            setSearchType("");
          } else if (data.status === 200) {
            const response = await data.json();
            setNewsList(response.entity);
            setSize(response.size);
            setNewsSizePageLocaleStorageParam(response.size);
            setNumberPage(response.numberPage);
            setNewsNumberPageLocaleStorageParam(response.numberPage);
            setMaxNumberPage(response.maxNumberPage);
            setNewsMaxNumberPageLocaleStorageParam(response.maxNumberPage);
            setCountAllEntity(response.countAllEntity);
            setResponceException("");
            setNewsSearchDescriptionLocaleStorageParam(searchDescription);
            setSearchDescription(searchDescription);
            setNewsSearchTypeLocaleStorageParam(searchType);
            setSearchType(searchType);
          } else if (data.status === 401) {
            setResponceException("Вы не авторизованы");
          } else if (data.status === 400) {
            const response = await data.json();
            setResponceException(response.errorMessage);
          } else if (data.status === 403) {
            setResponceException("У вас не достаточно прав на данную оперцию.");
          } else {
            setResponceException("Что-то пошло не так");
          }
        });
        break;
      case SEARCH_TYPE_AUTHOR_NAME.type:
        getNewsByPartOfAuthorNameQuary(
          searchDescription,
          size,
          numberPage,
          sortField,
          sortType
        ).then(async (data) => {
          if (data.status === 204) {
            setNewsList([]);
            setNewsSizePageLocaleStorageParam(size);
            setNumberPage(1);
            setNewsNumberPageLocaleStorageParam(1);
            setMaxNumberPage(1);
            setNewsMaxNumberPageLocaleStorageParam(1);
            setCountAllEntity(0);
            setResponceException("");
            removeNewsSearchDescriptionLocaleStorageParam();
            removeNewsSearchTypeLocaleStorageParam();
            setSearchDescription("");
            setSearchType("");
          } else if (data.status === 200) {
            const response = await data.json();
            setNewsList(response.entity);
            setSize(response.size);
            setNewsSizePageLocaleStorageParam(response.size);
            setNumberPage(response.numberPage);
            setNewsNumberPageLocaleStorageParam(response.numberPage);
            setMaxNumberPage(response.maxNumberPage);
            setNewsMaxNumberPageLocaleStorageParam(response.maxNumberPage);
            setCountAllEntity(response.countAllEntity);
            setResponceException("");
            setNewsSearchDescriptionLocaleStorageParam(searchDescription);
            setSearchDescription(searchDescription);
            setNewsSearchTypeLocaleStorageParam(searchType);
            setSearchType(searchType);
          } else if (data.status === 401) {
            setResponceException("Вы не авторизованы");
          } else if (data.status === 400) {
            const response = await data.json();
            setResponceException(response.errorMessage);
          } else if (data.status === 403) {
            setResponceException("У вас не достаточно прав на данную оперцию.");
          } else {
            setResponceException("Что-то пошло не так");
          }
        });
        break;
      case SEARCH_TYPE_AUTHOR_ID.type:
        getNewsByAuthorIdQuary(
          searchDescription,
          size,
          numberPage,
          sortField,
          sortType
        ).then(async (data) => {
          if (data.status === 204) {
            setNewsList([]);
            setNewsSizePageLocaleStorageParam(size);
            setNumberPage(1);
            setNewsNumberPageLocaleStorageParam(1);
            setMaxNumberPage(1);
            setNewsMaxNumberPageLocaleStorageParam(1);
            setCountAllEntity(0);
            setResponceException("");
            removeNewsSearchDescriptionLocaleStorageParam();
            removeNewsSearchTypeLocaleStorageParam();
            setSearchDescription("");
            setSearchType("");
          } else if (data.status === 200) {
            const response = await data.json();
            setNewsList(response.entity);
            setSize(response.size);
            setNewsSizePageLocaleStorageParam(response.size);
            setNumberPage(response.numberPage);
            setNewsNumberPageLocaleStorageParam(response.numberPage);
            setMaxNumberPage(response.maxNumberPage);
            setNewsMaxNumberPageLocaleStorageParam(response.maxNumberPage);
            setCountAllEntity(response.countAllEntity);
            setResponceException("");
            setNewsSearchDescriptionLocaleStorageParam(searchDescription);
            setSearchDescription(searchDescription);
            setNewsSearchTypeLocaleStorageParam(searchType);
            setSearchType(searchType);
          } else if (data.status === 401) {
            setResponceException("Вы не авторизованы");
          } else if (data.status === 400) {
            const response = await data.json();
            setResponceException(response.errorMessage);
          } else if (data.status === 403) {
            setResponceException("У вас не достаточно прав на данную оперцию.");
          } else {
            setResponceException("Что-то пошло не так");
          }
        });
        break;
      case SEARCH_TYPE_PART_OF_TITLE.type:
        getNewsByPartOfTitleQuary(
          searchDescription,
          size,
          numberPage,
          sortField,
          sortType
        ).then(async (data) => {
          if (data.status === 204) {
            setNewsList([]);
            setNewsSizePageLocaleStorageParam(size);
            setNumberPage(1);
            setNewsNumberPageLocaleStorageParam(1);
            setMaxNumberPage(1);
            setNewsMaxNumberPageLocaleStorageParam(1);
            setCountAllEntity(0);
            setResponceException("");
            removeNewsSearchDescriptionLocaleStorageParam();
            removeNewsSearchTypeLocaleStorageParam();
            setSearchDescription("");
            setSearchType("");
          } else if (data.status === 200) {
            const response = await data.json();
            setNewsList(response.entity);
            setSize(response.size);
            setNewsSizePageLocaleStorageParam(response.size);
            setNumberPage(response.numberPage);
            setNewsNumberPageLocaleStorageParam(response.numberPage);
            setMaxNumberPage(response.maxNumberPage);
            setNewsMaxNumberPageLocaleStorageParam(response.maxNumberPage);
            setCountAllEntity(response.countAllEntity);
            setResponceException("");
            setNewsSearchDescriptionLocaleStorageParam(searchDescription);
            setSearchDescription(searchDescription);
            setNewsSearchTypeLocaleStorageParam(searchType);
            setSearchType(searchType);
          } else if (data.status === 401) {
            setResponceException("Вы не авторизованы");
          } else if (data.status === 400) {
            const response = await data.json();
            setResponceException(response.errorMessage);
          } else if (data.status === 403) {
            setResponceException("У вас не достаточно прав на данную оперцию.");
          } else {
            setResponceException("Что-то пошло не так");
          }
        });
        break;
      case SEARCH_TYPE_PART_OF_CONTENT.type:
        getNewsByPartOfContentQuary(
          searchDescription,
          size,
          numberPage,
          sortField,
          sortType
        ).then(async (data) => {
          if (data.status === 204) {
            setNewsList([]);
            setNewsSizePageLocaleStorageParam(size);
            setNumberPage(1);
            setNewsNumberPageLocaleStorageParam(1);
            setMaxNumberPage(1);
            setNewsMaxNumberPageLocaleStorageParam(1);
            setCountAllEntity(0);
            setResponceException("");
            removeNewsSearchDescriptionLocaleStorageParam();
            removeNewsSearchTypeLocaleStorageParam();
            setSearchDescription("");
            setSearchType("");
          } else if (data.status === 200) {
            const response = await data.json();
            setNewsList(response.entity);
            setSize(response.size);
            setNewsSizePageLocaleStorageParam(response.size);
            setNumberPage(response.numberPage);
            setNewsNumberPageLocaleStorageParam(response.numberPage);
            setMaxNumberPage(response.maxNumberPage);
            setNewsMaxNumberPageLocaleStorageParam(response.maxNumberPage);
            setCountAllEntity(response.countAllEntity);
            setResponceException("");
            setNewsSearchDescriptionLocaleStorageParam(searchDescription);
            setSearchDescription(searchDescription);
            setNewsSearchTypeLocaleStorageParam(searchType);
            setSearchType(searchType);
          } else if (data.status === 401) {
            setResponceException("Вы не авторизованы");
          } else if (data.status === 400) {
            const response = await data.json();
            setResponceException(response.errorMessage);
          } else if (data.status === 403) {
            setResponceException("У вас не достаточно прав на данную оперцию.");
          } else {
            setResponceException("Что-то пошло не так");
          }
        });
        break;
      default:
        getAllNewsQuery(size, numberPage, sortField, sortType).then(
          async (data) => {
            if (data.status === 204) {
              setNewsList([]);
              setNewsSizePageLocaleStorageParam(size);
              setNumberPage(1);
              setNewsNumberPageLocaleStorageParam(1);
              setMaxNumberPage(1);
              setNewsMaxNumberPageLocaleStorageParam(1);
              setCountAllEntity(0);
              setResponceException("");
              removeNewsSearchDescriptionLocaleStorageParam();
              removeNewsSearchTypeLocaleStorageParam();
              setSearchDescription("");
              setSearchType("");
            } else if (data.status === 200) {
              const response = await data.json();
              setNewsList(response.entity);
              setSize(response.size);
              setNewsSizePageLocaleStorageParam(response.size);
              setNumberPage(response.numberPage);
              setNewsNumberPageLocaleStorageParam(response.numberPage);
              setMaxNumberPage(response.maxNumberPage);
              setNewsMaxNumberPageLocaleStorageParam(response.maxNumberPage);
              setCountAllEntity(response.countAllEntity);
              setResponceException("");
              removeNewsSearchDescriptionLocaleStorageParam();
              removeNewsSearchTypeLocaleStorageParam();
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
          }
        );
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
    getPaginationNewsByParams(
      searchDescription,
      searchType,
      page,
      sizePage,
      sortField,
      sortType
    );
  }

  const createNewsBtn = (
    <div className="ps-5">
      <Button
        style={{ height: "47px", width: "max-content" }}
        variant="primary"
        onClick={() => setIsShowModalCreateNewsForm(true)}
      >
        {(locale === LOCALE_EN && "Аdd news") ||
          (locale === LOCALE_RU && "Добавить новость")}
      </Button>
    </div>
  );

  const modalCreateNewsForm = (
    <Modal
      size="xl"
      show={isShowModalCreateNewsForm}
      backdrop="static"
      onHide={() => {
        setIsShowModalCreateNewsForm(false);
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
              {(locale === LOCALE_EN && "Creating news") ||
                (locale === LOCALE_RU && "Создание новости")}
            </h3>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateNewsForm
          valueLocale={locale}
          valueUserRole={userRole}
          onChangeNews={() => {
            getPaginationNewsByParams(
              searchDescription,
              searchType,
              numberPage,
              size,
              sortField,
              sortType
            );
            setIsShowModalCreateNewsForm(false);
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
          style={{
            paddingTop: "40px",
            height: "90px",
          }}
        >
          <SearchNews
            className="w-100"
            valueLocale={locale}
            valueUserRole={userRole}
            onChangeNewsList={(searchDescription, searchType) => {
              getPaginationNewsByParams(
                searchDescription,
                searchType,
                DEFAULT_NUMBER_PAGE,
                size,
                sortField,
                sortType
              );
            }}
            valueSearchType={searchType}
            valueSearchDescriptionPattern={searchDescriptionPattern}
            valueSearchDescription={searchDescription}
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
                removeNewsSearchTypeLocaleStorageParam();
                removeNewsSearchDescriptionLocaleStorageParam();
                getPaginationNewsByParams(
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
          {(userRole === ROLE_USER || userRole === ROLE_ADMIN) && (
            <div>
              {createNewsBtn}
              <div>{modalCreateNewsForm}</div>
            </div>
          )}
        </div>
        {searchType !== "" && (
          <div>
            <h5>
              {(locale === LOCALE_EN && "Search parameters: ") ||
                (locale === LOCALE_RU && "Параметры поиска: ")}
              {(searchType === SEARCH_TYPE_ID.type &&
                ((locale === LOCALE_RU && `по номеру новости`) ||
                  (locale === LOCALE_EN && `by news number`))) ||
                (searchType === SEARCH_TYPE_TAG_NAME.type &&
                  ((locale === LOCALE_RU && `по названию тега`) ||
                    (locale === LOCALE_EN && `by tag name`))) ||
                (searchType === SEARCH_TYPE_TAG_ID.type &&
                  ((locale === LOCALE_RU && `по номеру тега`) ||
                    (locale === LOCALE_EN && `by tag number`))) ||
                (searchType === SEARCH_TYPE_AUTHOR_NAME.type &&
                  ((locale === LOCALE_RU && `по имени автора`) ||
                    (locale === LOCALE_EN && `by author name`))) ||
                (searchType === SEARCH_TYPE_AUTHOR_ID.type &&
                  ((locale === LOCALE_RU && `по номеру автора`) ||
                    (locale === LOCALE_EN && `by author number`))) ||
                (searchType === SEARCH_TYPE_PART_OF_TITLE.type &&
                  ((locale === LOCALE_RU && `по части заголовка`) ||
                    (locale === LOCALE_EN && `by part of title`))) ||
                (searchType === SEARCH_TYPE_PART_OF_CONTENT.type &&
                  ((locale === LOCALE_RU && `по части контента`) ||
                    (locale === LOCALE_EN && `by part of content`)))}
              ={searchDescription}
            </h5>
          </div>
        )}
        <div className="d-flex justify-content-between pt-3 pb-3">
          <h2>
            {countAllEntity}{" "}
            {(locale === LOCALE_RU && `Новости`) ||
              (locale === LOCALE_EN && `News`)}
          </h2>
          <div className="d-flex justify-content-between align-items-center">
            <SortTypeSelect
              valueLocale={locale}
              valueUserRole={userRole}
              valueSortType={sortType}
              onChangeSortType={(sortType) => {
                setSortType(sortType);
                setNewsSortTypeLocaleStorageParam(sortType);
                getPaginationNewsByParams(
                  searchDescription,
                  searchType,
                  numberPage,
                  size,
                  sortField,
                  sortType
                );
              }}
            />
            <SortFieldSelect
              valueLocale={locale}
              valueUserRole={userRole}
              valueSortField={sortField}
              onChangeSortField={(sortField) => {
                setSortField(sortField);
                setNewsSortFieldLocaleStorageParam(sortField);
                getPaginationNewsByParams(
                  searchDescription,
                  searchType,
                  numberPage,
                  size,
                  sortField,
                  sortType
                );
              }}
            />
          </div>
        </div>
        {responceException.length === 0 && newsList.length > 0 && (
          <NewsList
            onChangeNews={() =>
              getPaginationNewsByParams(
                searchDescription,
                searchType,
                numberPage,
                size,
                sortField,
                sortType
              )
            }
            valueUserRole={userRole}
            valueNewsList={newsList}
            valueLocale={locale}
            onChangeUserRole={(userRole) => props.onChangeUserRole(userRole)}
          />
        )}
        {responceException.length === 0 && newsList.length === 0 && (
          <div
            className="text-center d-flex justify-content-center align-items-center pb-5"
            style={{
              minHeight: "60vh",
              flexDirection: "column",
            }}
          >
            <h2 className="text-center mb-5">
              {(locale === LOCALE_RU &&
                `По выбранным критериям новостей не найдено`) ||
                (locale === LOCALE_EN &&
                  `No news found according to the selected criteria`)}
            </h2>
            <button
              onClick={() => {
                const searchDescription = "";
                const searchType = "";
                getPaginationNewsByParams(
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
                {(locale === LOCALE_RU && `Показать все новости`) ||
                  (locale === LOCALE_EN && `Show all News`)}
              </h5>
            </button>
          </div>
        )}
        {responceException.length === 0 && newsList.length > 0 && (
          <NewsPagination
            valueNumberPage={numberPage}
            valueMaxNumberPage={maxNumberPage}
            valueSize={size}
            onChoosedNumberPage={(numberPage) => {
              getPaginationNewsByParams(
                searchDescription,
                searchType,
                numberPage,
                size,
                sortField,
                sortType
              );
            }}
            onChoosedSize={(size) => {
              getPaginationNewsByParams(
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
        {responceException.length > 0 && (
          <div
            className="text-center d-flex justify-content-center align-items-center pb-5"
            style={{
              minHeight: "60vh",
              flexDirection: "column",
            }}
          >
            <h2 className="text-center mb-5">{responceException}</h2>
            <button
              onClick={() => {
                const searchDescription = "";
                const searchType = "";
                getPaginationNewsByParams(
                  searchDescription,
                  searchType,
                  DEFAULT_SIZE_PAGE,
                  DEFAULT_NUMBER_PAGE,
                  DEFAULT_SORT_FIELD,
                  DEFAULT_SORT_TYPE
                );
              }}
              className="btn btn-primary"
            >
              <h5 style={{ margin: 0, padding: "10px 20px" }}>
                {(locale === LOCALE_RU && `Показать все новости`) ||
                  (locale === LOCALE_EN && `Show all News`)}
              </h5>
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
export default NewsContentSection;
