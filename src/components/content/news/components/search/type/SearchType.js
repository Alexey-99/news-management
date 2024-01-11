const createSearchType = (type, pattern) => {
  return {
    type: type,
    pattern: pattern,
  };
};

export const SEARCH_TYPE_ID = createSearchType("ID", "\\d+");
export const SEARCH_TYPE_TAG_NAME = createSearchType("TAG_NAME", "[^<>]{3,15}");
export const SEARCH_TYPE_TAG_ID = createSearchType("TAG_ID", "\\d+");
export const SEARCH_TYPE_AUTHOR_NAME = createSearchType(
  "AUTHOR_NAME",
  "[^<>]{3,15}"
);
export const SEARCH_TYPE_AUTHOR_ID = createSearchType("AUTHOR_ID", "\\d+");
export const SEARCH_TYPE_PART_OF_TITLE = createSearchType(
  "PART_OF_TITLE",
  "[^<>]+"
);
export const SEARCH_TYPE_PART_OF_CONTENT = createSearchType(
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
