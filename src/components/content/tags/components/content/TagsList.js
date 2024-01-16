import { LOCALE_EN, LOCALE_RU } from "../../../../../locate/Locale";
import { ROLE_ADMIN } from "../../../../../role/UserRole";
import { TAGS_COUNT_NEWS, TAGS_ID, TAGS_NAME } from "../sort/SortField";
import { ASC, DESC } from "../sort/SortType";
import TagItem from "./components/TagItem";

const TagsList = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;
  const tagsList = props.valueTagsList;
  const sortType = props.valueSortType;
  const sortField = props.valueSortField;

  return (
    <table className="table table-success table-striped table-hover">
      <thead>
        <tr>
          <th scope="col " className="align-middle text-center">
            <div
              className="btn"
              style={{ fontWeight: "bold", border: "1px solid" }}
              onClick={() => {
                const sortFieldChoose = TAGS_ID;
                let sortTypeChoose = "";
                if (sortField === TAGS_ID && sortType === ASC) {
                  sortTypeChoose = DESC;
                } else {
                  sortTypeChoose = ASC;
                }
                props.onChangeSorting(sortFieldChoose, sortTypeChoose);
              }}
            >
              {(locale === LOCALE_RU && `номер тега`) ||
                (locale === LOCALE_EN && `number of tag`)}
            </div>
          </th>
          <th scope="col" className="align-middle text-center">
            <div
              className="btn"
              style={{ fontWeight: "bold", border: "1px solid" }}
              onClick={() => {
                const sortFieldChoose = TAGS_NAME;
                let sortTypeChoose = "";
                if (sortField === TAGS_NAME && sortType === ASC) {
                  sortTypeChoose = DESC;
                } else {
                  sortTypeChoose = ASC;
                }
                props.onChangeSorting(sortFieldChoose, sortTypeChoose);
              }}
            >
              {(locale === LOCALE_RU && `название тега`) ||
                (locale === LOCALE_EN && `name of tag`)}
            </div>
          </th>
          <th scope="col" className="text-center align-middle">
            <div
              className="btn"
              style={{ fontWeight: "bold", border: "1px solid" }}
              onClick={() => {
                const sortFieldChoose = TAGS_COUNT_NEWS;
                let sortTypeChoose = "";
                if (sortField === TAGS_COUNT_NEWS && sortType === ASC) {
                  sortTypeChoose = DESC;
                } else {
                  sortTypeChoose = ASC;
                }
                props.onChangeSorting(sortFieldChoose, sortTypeChoose);
              }}
            >
              {(locale === LOCALE_RU && `количество новостей`) ||
                (locale === LOCALE_EN && `count news`)}
            </div>
          </th>
          {userRole === ROLE_ADMIN && (
            <th className="text-center align-middle" scope="col">
              {(locale === LOCALE_RU && `изменить`) ||
                (locale === LOCALE_EN && `change`)}
            </th>
          )}
          {userRole === ROLE_ADMIN && (
            <th className="text-center align-middle" scope="col">
              {(locale === LOCALE_RU && ` удалить из всех новостей`) ||
                (locale === LOCALE_EN && `delete from all news`)}
            </th>
          )}
          {userRole === ROLE_ADMIN && (
            <th className="text-center align-middle" scope="col">
              {(locale === LOCALE_RU && (
                <div>
                  <div>удалить тег</div>
                  <div> (в том числе из новостей)</div>
                </div>
              )) ||
                (locale === LOCALE_EN && (
                  <div>
                    <div>delete tag</div>
                    <div>(including from the news)</div>
                  </div>
                ))}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {tagsList.map((tag) => {
          return (
            <TagItem
              key={tag.id}
              valueTag={tag}
              valueUserRole={userRole}
              valueLocale={locale}
              onChangeUserRole={(userRole) => props.onChangeUserRole(userRole)}
              onChangeTag={() => props.onChangeTag()}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default TagsList;
