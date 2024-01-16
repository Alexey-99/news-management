const createSearchType = (id, type, pattern) => {
  return {
    id: id,
    type: type,
    pattern: pattern,
  };
};

export const SEARCH_TYPE_ID = createSearchType(1, "ID", "\\d+");
export const SEARCH_TYPE_TAG_NAME = createSearchType(
  2,
  "TAG_NAME",
  "[^<>]{3,15}"
);
export const SEARCH_TYPE_TAG_ID = createSearchType(3, "TAG_ID", "\\d+");
export const SEARCH_TYPE_AUTHOR_NAME = createSearchType(
  4,
  "AUTHOR_NAME",
  "[^<>]{3,15}"
);
export const SEARCH_TYPE_AUTHOR_ID = createSearchType(5, "AUTHOR_ID", "\\d+");
export const SEARCH_TYPE_PART_OF_TITLE = createSearchType(
  6,
  "PART_OF_TITLE",
  "[^<>]+"
);
export const SEARCH_TYPE_PART_OF_CONTENT = createSearchType(
  7,
  "PART_OF_CONTENT",
  "[^<>]+"
);

export const getSearchTypesValues = () => {
  return Array.of(
    SEARCH_TYPE_ID,
    SEARCH_TYPE_TAG_NAME,
    SEARCH_TYPE_TAG_ID,
    SEARCH_TYPE_AUTHOR_NAME,
    SEARCH_TYPE_AUTHOR_ID,
    SEARCH_TYPE_PART_OF_TITLE,
    SEARCH_TYPE_PART_OF_CONTENT
  );
};
