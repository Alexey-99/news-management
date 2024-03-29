import { useState } from "react";
import {
  SEARCH_TYPE_ID,
  SEARCH_TYPE_TAG_NAME,
  SEARCH_TYPE_TAG_ID,
  SEARCH_TYPE_AUTHOR_NAME,
  SEARCH_TYPE_AUTHOR_ID,
  SEARCH_TYPE_PART_OF_TITLE,
  SEARCH_TYPE_PART_OF_CONTENT,
  getSearchTypesValues,
} from "./type/SearchType";
import { LOCALE_EN, LOCALE_RU } from "../../../../../locate/Locale";
import {
  getNewsSearchDescriptionLocaleStorageParam,
  getNewsSearchTypeLocaleStorageParam,
} from "../../../../../params/LocaleStorageParams";

const SearchNews = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;

  const [searchDescription, setSearchDescription] = useState();
  const [searchType, setSearchType] = useState("");
  const [validPattern, setValidPattern] = useState();

  return (
    <div className={props.className}>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const foundSearchType = getSearchTypesValues().filter(
            (searchItem) => searchItem.type === searchType
          )[0];
          if (foundSearchType !== undefined && foundSearchType !== null) {
            const searchDescriptionMatch = searchDescription.match(
              foundSearchType.pattern
            );
            if (searchDescriptionMatch[0] === searchDescription) {
              props.onChangeNewsList(searchDescription, foundSearchType.type);
            } else {
              props.onChangeNewsList("", "");
            }
          } else {
            const searchTypeLocaleStorage =
              getNewsSearchTypeLocaleStorageParam();
            const foundSearchType = getSearchTypesValues().filter(
              (searchType) => searchType.type === searchTypeLocaleStorage
            )[0];
            if (foundSearchType !== null || foundSearchType === undefined) {
              const searchDescriptionLocaleStorage =
                getNewsSearchDescriptionLocaleStorageParam();
              if (searchDescriptionLocaleStorage != null) {
                const searchDescriptionMatch =
                  searchDescriptionLocaleStorage.match(foundSearchType.pattern);
                if (
                  searchDescriptionMatch[0] === searchDescriptionLocaleStorage
                ) {
                  props.onChangeNewsList(
                    searchDescriptionLocaleStorage,
                    foundSearchType.type
                  );
                } else {
                  props.onChangeNewsList("", "");
                }
              } else {
                props.onChangeNewsList("", "");
              }
            } else {
              props.onChangeNewsList("", "");
            }
          }
        }}
        className="d-flex needs-validation"
      >
        <div className="input-group has-validation">
          <input
            pattern={validPattern}
            required
            onChange={(event) => setSearchDescription(event.target.value)}
            style={{ borderRadius: "20px 0 0 20px", width: "50%" }}
            type="text"
            className="form-control"
            placeholder={
              (locale === LOCALE_EN && "Search news ...") ||
              (locale === LOCALE_RU && "Поиск новостей ...") ||
              "Search news ..."
            }
          />
          <select
            required
            style={{ borderRadius: "0" }}
            onChange={(event) => {
              setSearchType(event.target.value.split("___")[0]);
              setValidPattern(event.target.value.split("___")[1].trim());
            }}
            className="form-select"
            defaultValue={searchType}
          >
            <option value="" disabled>
              {(locale === LOCALE_EN && "Select search type") ||
                (locale === LOCALE_RU && "Выберите тип поиска")}
            </option>
            <option
              value={`${SEARCH_TYPE_ID.type}___${SEARCH_TYPE_ID.pattern}`}
            >
              {(locale === LOCALE_EN && "number of news") ||
                (locale === LOCALE_RU && "номер новости")}
            </option>
            <option
              value={`${SEARCH_TYPE_TAG_NAME.type}___${SEARCH_TYPE_TAG_NAME.pattern}`}
            >
              {(locale === LOCALE_EN && "tag name") ||
                (locale === LOCALE_RU && "название тега")}
            </option>
            <option
              value={`${SEARCH_TYPE_TAG_ID.type}___${SEARCH_TYPE_TAG_ID.pattern}`}
            >
              {(locale === LOCALE_EN && "number of tag") ||
                (locale === LOCALE_RU && "номер тега")}
            </option>
            <option
              value={`${SEARCH_TYPE_AUTHOR_NAME.type}___${SEARCH_TYPE_AUTHOR_NAME.pattern}`}
            >
              {(locale === LOCALE_EN && "author name") ||
                (locale === LOCALE_RU && "имя автора")}
            </option>
            <option
              value={`${SEARCH_TYPE_AUTHOR_ID.type}___${SEARCH_TYPE_AUTHOR_ID.pattern}
              `}
            >
              {(locale === LOCALE_EN && "number of author") ||
                (locale === LOCALE_RU && "номер автора")}
            </option>
            <option
              value={`${SEARCH_TYPE_PART_OF_TITLE.type}___${SEARCH_TYPE_PART_OF_TITLE.pattern}
              `}
            >
              {(locale === LOCALE_EN && "part of title  of news") ||
                (locale === LOCALE_RU && "часть заголовка новости")}
            </option>
            <option
              value={`${SEARCH_TYPE_PART_OF_CONTENT.type}___${SEARCH_TYPE_PART_OF_CONTENT.pattern}`}
            >
              {(locale === LOCALE_EN && "part of content of news") ||
                (locale === LOCALE_RU && "часть контента новости")}
            </option>
          </select>
          <button
            className="btn btn-outline-secondary"
            style={{
              background: "white",
              border: "none",
              borderRadius: "0 20px 20px 0",
            }}
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="35"
              height="35"
              viewBox="0 0 50 50"
            >
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchNews;
