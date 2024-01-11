const createSearchType = (type, pattern) => {
  return {
    type: type,
    pattern: pattern,
  };
};

export const SEARCH_TYPE_ID = createSearchType("ID", "\\d+");
export const SEARCH_TYPE_NEWS_ID = createSearchType("NEWS_ID", "\\d+");
export const SEARCH_TYPE_PART_OF_NAME = createSearchType(
  "PART_OF_NAME",
  "[^<>]+"
);

export const getSearchTypesValues = () => {
  return Array.of(
    SEARCH_TYPE_ID,
    SEARCH_TYPE_NEWS_ID,
    SEARCH_TYPE_PART_OF_NAME
  );
};