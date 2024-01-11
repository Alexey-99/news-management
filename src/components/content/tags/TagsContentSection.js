import { useState } from "react";
import {
  getAllTagsQueryWithPages,
  getTagByIdQuery,
  getTagsByNewsIdQuery,
  getTagsByPartOfNameQuery,
} from "../../../query/Tag";
import SearchTags from "./components/search/SearchTags";
import {
  SEARCH_TYPE_ID,
  SEARCH_TYPE_NEWS_ID,
  SEARCH_TYPE_PART_OF_NAME,
  getSearchTypesValues,
} from "./components/search/type/SearchType";
import {
  TAGS_COUNT_NEWS,
  TAGS_ID,
  TAGS_NAME,
} from "./components/sort/SortField";
import { Button, Modal } from "react-bootstrap";
import { ROLE_ADMIN } from "../../../role/UserRole";
import TagsList from "./components/content/TagsList";
import CreateTagForm from "./components/form/CreateTagForm";
import TagsPagination from "./components/pagination/TagPagination";
import {
  getTagsNumberPageSessionStorageParam,
  getTagsSearchDescriptionSessionStorageParam,
  getTagsSearchTypeSessionStorageParam,
  getTagsSizePageSessionStorageParam,
  getTagsSortFieldSessionStorageParam,
  getTagsSortTypeSessionStorageParam,
  removeTagsSearchDescriptionSessionStorageParam,
  removeTagsSearchTypeSessionStorageParam,
  setTagsMaxNumberPageSessionStorageParam,
  setTagsNumberPageSessionStorageParam,
  setTagsSearchDescriptionSessionStorageParam,
  setTagsSearchTypeSessionStorageParam,
  setTagsSizePageSessionStorageParam,
  setTagsSortFieldSessionStorageParam,
  setTagsSortTypeSessionStorageParam,
} from "../../../params/SessionStorageParams";
import { PAGE_SIZE_VALUES } from "./components/pagination/PageSizeValues";
import { ASC, DESC } from "./components/sort/SortType";
import { LOCALE_EN, LOCALE_RU } from "../../../locate/Locale";

const TagsContentSection = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;

  const DEFAULT_NUMBER_PAGE = 1;
  const DEFAULT_SIZE_PAGE = PAGE_SIZE_VALUES[0];
  const DEFAULT_SORT_FIELD = TAGS_ID;
  const DEFAULT_SORT_TYPE = ASC;

  const [searchDescription, setSearchDescription] = useState("");
  const [searchDescriptionPattern, setSearchDescriptionPattern] = useState("");
  const [searchType, setSearchType] = useState("");

  const [tagsList, setTagsList] = useState([]);

  const [numberPage, setNumberPage] = useState(DEFAULT_NUMBER_PAGE);
  const [size, setSize] = useState(DEFAULT_SIZE_PAGE);
  const [maxNumberPage, setMaxNumberPage] = useState(DEFAULT_NUMBER_PAGE);
  const [countAllEntity, setCountAllEntity] = useState();
  const [sortField, setSortField] = useState(DEFAULT_SORT_FIELD);
  const [sortType, setSortType] = useState(DEFAULT_SORT_TYPE);
  const [isNeedInit, setIsNeedInit] = useState(true);
  const [responceException, setResponceException] = useState("");
  const [isShowModalCreateTagForm, setIsShowModalCreateTagForm] =
    useState(false);

  const findNumberPage = () => {
    const pageSessionStorage = getTagsNumberPageSessionStorageParam();
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
        setTagsNumberPageSessionStorageParam(DEFAULT_NUMBER_PAGE);
        setNumberPage(DEFAULT_NUMBER_PAGE);
        return DEFAULT_NUMBER_PAGE;
      }
    } else {
      setTagsNumberPageSessionStorageParam(DEFAULT_NUMBER_PAGE);
      setNumberPage(DEFAULT_NUMBER_PAGE);
      return DEFAULT_NUMBER_PAGE;
    }
  };

  const findSizePage = () => {
    const tagsSizePageSessionStorage = getTagsSizePageSessionStorageParam();
    const isFoundSize =
      PAGE_SIZE_VALUES.filter((value) => value == tagsSizePageSessionStorage)
        .length > 0;
    if (isFoundSize) {
      setSize(tagsSizePageSessionStorage);
      return tagsSizePageSessionStorage;
    } else {
      setTagsSizePageSessionStorageParam(DEFAULT_SIZE_PAGE);
      setSize(DEFAULT_SIZE_PAGE);
      return DEFAULT_SIZE_PAGE;
    }
  };

  const findSortField = () => {
    let result = DEFAULT_SORT_FIELD;
    const tagsSortFieldSessionStorage = getTagsSortFieldSessionStorageParam();
    if (
      tagsSortFieldSessionStorage != null &&
      tagsSortFieldSessionStorage !== ""
    ) {
      if (TAGS_ID === tagsSortFieldSessionStorage) {
        setSortField(TAGS_ID);
        result = TAGS_ID;
      } else if (TAGS_NAME === tagsSortFieldSessionStorage) {
        setSortField(TAGS_NAME);
        result = TAGS_NAME;
      } else if (TAGS_COUNT_NEWS === tagsSortFieldSessionStorage) {
        setSortField(TAGS_COUNT_NEWS);
        result = TAGS_COUNT_NEWS;
      } else {
        setSortField(DEFAULT_SORT_FIELD);
        setTagsSortFieldSessionStorageParam(DEFAULT_SORT_FIELD);
      }
    } else {
      setSortField(DEFAULT_SORT_FIELD);
      setTagsSortFieldSessionStorageParam(DEFAULT_SORT_FIELD);
    }
    return result;
  };

  const findSortType = () => {
    let result = DEFAULT_SORT_TYPE;
    const tagsSortTypeSessionStorage = getTagsSortTypeSessionStorageParam();
    if (
      tagsSortTypeSessionStorage != null &&
      tagsSortTypeSessionStorage !== ""
    ) {
      if (ASC === tagsSortTypeSessionStorage) {
        setSortType(ASC);
        result = ASC;
      } else if (DESC === tagsSortTypeSessionStorage) {
        setSortType(DESC);
        result = DESC;
      } else {
        setSortType(DEFAULT_SORT_TYPE);
        setTagsSortTypeSessionStorageParam(DEFAULT_SORT_TYPE);
      }
    } else {
      setSortType(DEFAULT_SORT_TYPE);
      setTagsSortTypeSessionStorageParam(DEFAULT_SORT_TYPE);
    }
    return result;
  };

  const findSearchType = () => {
    let result = "";
    const searchTypeSessionStorage = getTagsSearchTypeSessionStorageParam();
    if (searchTypeSessionStorage !== null) {
      const foundSearchType = getSearchTypesValues().filter(
        (searchType) => searchTypeSessionStorage === searchType.type
      )[0];
      if (findNumberPage !== null) {
        result = searchTypeSessionStorage;
        setSearchDescriptionPattern(foundSearchType.pattern);
        setSearchType(foundSearchType.type);
      } else {
        removeTagsSearchTypeSessionStorageParam();
        setSearchType("");
      }
    } else {
      removeTagsSearchTypeSessionStorageParam();
      setSearchType("");
    }
    return result;
  };

  const findSearchDescription = (searchType) => {
    let result = "";
    const searchDescriptionSessionStorage =
      getTagsSearchDescriptionSessionStorageParam();
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
          removeTagsSearchDescriptionSessionStorageParam();
          removeTagsSearchTypeSessionStorageParam();
          setSearchDescription("");
          setSearchType("");
        }
      } else {
        removeTagsSearchDescriptionSessionStorageParam();
        removeTagsSearchTypeSessionStorageParam();
        setSearchDescription("");
        setSearchType("");
      }
    } else {
      removeTagsSearchDescriptionSessionStorageParam();
      removeTagsSearchTypeSessionStorageParam();
      setSearchDescription("");
      setSearchType("");
    }
    return result;
  };

  const getPaginationTagsByParams = async (
    searchDescription,
    searchType,
    numberPage,
    size,
    sortField,
    sortType
  ) => {
    switch (searchType) {
      case SEARCH_TYPE_ID.type:
        getTagByIdQuery(searchDescription)
          .then(async (data) => {
            if (data.status === 204) {
              setTagsList([]);
              setTagsSizePageSessionStorageParam(size);
              setNumberPage(1);
              setTagsNumberPageSessionStorageParam(1);
              setMaxNumberPage(1);
              setTagsMaxNumberPageSessionStorageParam(1);
              setCountAllEntity(0);
              setResponceException("");
              removeTagsSearchDescriptionSessionStorageParam();
              removeTagsSearchTypeSessionStorageParam();
              setSearchDescription("");
              setSearchType("");
            } else if (data.status === 200) {
              const response = await data.json();
              setTagsList(Array.of(response));
              setTagsSizePageSessionStorageParam(size);
              setNumberPage(1);
              setTagsNumberPageSessionStorageParam(1);
              setMaxNumberPage(1);
              setTagsMaxNumberPageSessionStorageParam(1);
              setCountAllEntity(1);
              setResponceException("");
              setTagsSearchDescriptionSessionStorageParam(searchDescription);
              setSearchDescription(searchDescription);
              setTagsSearchTypeSessionStorageParam(searchType);
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
        getTagsByNewsIdQuery(
          searchDescription,
          size,
          numberPage,
          sortField,
          sortType
        )
          .then(async (data) => {
            if (data.status === 204) {
              setTagsList([]);
              setTagsSizePageSessionStorageParam(size);
              setNumberPage(1);
              setTagsNumberPageSessionStorageParam(1);
              setMaxNumberPage(1);
              setTagsMaxNumberPageSessionStorageParam(1);
              setCountAllEntity(0);
              setResponceException("");
              removeTagsSearchDescriptionSessionStorageParam();
              removeTagsSearchTypeSessionStorageParam();
              setSearchDescription("");
              setSearchType("");
            } else if (data.status === 200) {
              const response = await data.json();
              setTagsList(response.entity);
              setSize(response.size);
              setTagsSizePageSessionStorageParam(response.size);
              setNumberPage(response.numberPage);
              setTagsNumberPageSessionStorageParam(response.numberPage);
              setMaxNumberPage(response.maxNumberPage);
              setTagsMaxNumberPageSessionStorageParam(response.maxNumberPage);
              setCountAllEntity(response.countAllEntity);
              setResponceException("");
              setTagsSearchDescriptionSessionStorageParam(searchDescription);
              setSearchDescription(searchDescription);
              setTagsSearchTypeSessionStorageParam(searchType);
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
        getTagsByPartOfNameQuery(
          searchDescription,
          size,
          numberPage,
          sortField,
          sortType
        )
          .then(async (data) => {
            if (data.status === 204) {
              setTagsList([]);
              setTagsSizePageSessionStorageParam(size);
              setNumberPage(1);
              setTagsNumberPageSessionStorageParam(1);
              setMaxNumberPage(1);
              setTagsMaxNumberPageSessionStorageParam(1);
              setCountAllEntity(0);
              setResponceException("");
              removeTagsSearchDescriptionSessionStorageParam();
              removeTagsSearchTypeSessionStorageParam();
              setSearchDescription("");
              setSearchType("");
            } else if (data.status === 200) {
              const response = await data.json();
              setTagsList(response.entity);
              setSize(response.size);
              setTagsSizePageSessionStorageParam(response.size);
              setNumberPage(response.numberPage);
              setTagsNumberPageSessionStorageParam(response.numberPage);
              setMaxNumberPage(response.maxNumberPage);
              setTagsMaxNumberPageSessionStorageParam(response.maxNumberPage);
              setCountAllEntity(response.countAllEntity);
              setResponceException("");
              setTagsSearchDescriptionSessionStorageParam(searchDescription);
              setSearchDescription(searchDescription);
              setTagsSearchTypeSessionStorageParam(searchType);
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
        getAllTagsQueryWithPages(size, numberPage, sortField, sortType)
          .then(async (data) => {
            if (data.status === 204) {
              setTagsList([]);
              setTagsSizePageSessionStorageParam(size);
              setNumberPage(1);
              setTagsNumberPageSessionStorageParam(1);
              setMaxNumberPage(1);
              setTagsMaxNumberPageSessionStorageParam(1);
              setCountAllEntity(0);
              setResponceException("");
              removeTagsSearchDescriptionSessionStorageParam();
              removeTagsSearchTypeSessionStorageParam();
              setSearchDescription("");
              setSearchType("");
            } else if (data.status === 200) {
              const response = await data.json();
              setTagsList(response.entity);
              setSize(response.size);
              setTagsSizePageSessionStorageParam(response.size);
              setNumberPage(response.numberPage);
              setTagsNumberPageSessionStorageParam(response.numberPage);
              setMaxNumberPage(response.maxNumberPage);
              setTagsMaxNumberPageSessionStorageParam(response.maxNumberPage);
              setCountAllEntity(response.countAllEntity);
              setResponceException("");
              removeTagsSearchDescriptionSessionStorageParam();
              removeTagsSearchTypeSessionStorageParam();
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
    getPaginationTagsByParams(
      searchDescription,
      searchType,
      page,
      sizePage,
      sortField,
      sortType
    );
  }

  const createTagBtn = (
    <div className="ps-5 text-uppercase">
      <Button
        style={{ height: "47px", width: "max-content" }}
        variant="primary"
        onClick={() => setIsShowModalCreateTagForm(true)}
      >
        {(locale === LOCALE_EN && "Add tag") ||
          (locale === LOCALE_RU && "Добавить тег")}
      </Button>
    </div>
  );

  const modalCreateTagForm = (
    <Modal
      size="xl"
      show={isShowModalCreateTagForm}
      backdrop="static"
      onHide={() => {
        setResponceException("");
        setIsShowModalCreateTagForm(false);
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
              {(locale === LOCALE_EN && "Create tag") ||
                (locale === LOCALE_RU && "Создание тега")}
            </h3>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateTagForm
          onCreateTag={() => {
            getPaginationTagsByParams(
              searchDescription,
              searchType,
              numberPage,
              size,
              sortField,
              sortType
            );
            setIsShowModalCreateTagForm(false);
          }}
          valueLocale={locale}
          valueUserRole={userRole}
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
          <SearchTags
            className="w-100"
            onChangeTagsList={(searchDescription, searchType) => {
              getPaginationTagsByParams(
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
                removeTagsSearchTypeSessionStorageParam();
                removeTagsSearchDescriptionSessionStorageParam();
                getPaginationTagsByParams(
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
              <div>{createTagBtn}</div>
              <div>{modalCreateTagForm}</div>
            </div>
          )}
        </div>
        {searchType !== "" && (
          <div>
            <h5>
              {(locale === LOCALE_EN && "Search parameters: ") ||
                (locale === LOCALE_RU && "Параметры поиска: ")}
              {(searchType === SEARCH_TYPE_ID.type &&
                ((locale === LOCALE_RU && `по номеру тега`) ||
                  (locale === LOCALE_EN && `by tag number`))) ||
                (searchType === SEARCH_TYPE_NEWS_ID.type &&
                  ((locale === LOCALE_RU && `по номеру новости`) ||
                    (locale === LOCALE_EN && `by news number`))) ||
                (searchType === SEARCH_TYPE_PART_OF_NAME.type &&
                  ((locale === LOCALE_RU && `по части названия тега`) ||
                    (locale === LOCALE_EN && `by part of tag name`)))}
              ={searchDescription}
            </h5>
          </div>
        )}
        <h2>
          {countAllEntity}{" "}
          {(locale === LOCALE_RU && `Тегов`) ||
            (locale === LOCALE_EN && `Tags`)}
        </h2>
        {responceException.length === 0 && tagsList.length > 0 && (
          <TagsList
            valueUserRole={userRole}
            valueLocale={locale}
            valueTagsList={tagsList}
            valueSortType={sortType}
            valueSortField={sortField}
            onChangeUserRole={(userRole) => props.onChangeUserRole(userRole)}
            onChangeTag={() =>
              getPaginationTagsByParams(
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
              getPaginationTagsByParams(
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
        {responceException.length === 0 && tagsList.length === 0 && (
          <div
            className="text-center d-flex justify-content-center align-items-center pb-5"
            style={{
              minHeight: "60vh",
              flexDirection: "column",
            }}
          >
            <h2 className="text-center mb-5">
              {(locale === LOCALE_RU &&
                `По выбранным критериям тегов не найдено`) ||
                (locale === LOCALE_EN &&
                  `No tags found according to the selected criteria`)}
            </h2>
            <button
              onClick={() => {
                const searchDescription = "";
                const searchType = "";
                getPaginationTagsByParams(
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
                {(locale === LOCALE_RU && `Показать все теги`) ||
                  (locale === LOCALE_EN && `Show all tags`)}
              </h5>
            </button>
          </div>
        )}
        {responceException.length === 0 && tagsList.length > 0 && (
          <TagsPagination
            valueNumberPage={numberPage}
            valueMaxNumberPage={maxNumberPage}
            valueSize={size}
            onChoosedNumberPage={(numberPage) => {
              getPaginationTagsByParams(
                searchDescription,
                searchType,
                numberPage,
                size,
                sortField,
                sortType
              );
            }}
            onChoosedSize={(size) => {
              getPaginationTagsByParams(
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

export default TagsContentSection;
