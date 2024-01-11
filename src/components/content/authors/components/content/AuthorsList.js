import { LOCALE_EN, LOCALE_RU } from "../../../../../locate/Locale";
import { ROLE_ADMIN } from "../../../../../role/UserRole";
import TagItem from "../../../tags/components/content/components/TagItem";
import { AUTHOR_COUNT_NEWS, AUTHOR_ID, AUTHOR_NAME } from "../sort/SortField";
import { ASC, DESC } from "../sort/SortType";
import AuthorItem from "./components/AuthorItem";

const AuthorsList = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;
  const authorsList = props.valueAuthorsList;
  const sortType = props.valueSortType;
  const sortField = props.valueSortField;

  return (
    <table className="table table-success table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">
            <div
              className="btn"
              style={{ fontWeight: "bold" }}
              onClick={() => {
                const sortFieldChoose = AUTHOR_ID;
                let sortTypeChoose = "";
                if (sortField === AUTHOR_ID && sortType === ASC) {
                  sortTypeChoose = DESC;
                } else {
                  sortTypeChoose = ASC;
                }
                props.onChangeSorting(sortFieldChoose, sortTypeChoose);
              }}
            >
              {(locale === LOCALE_RU && `номер автора`) ||
                (locale === LOCALE_EN && `number of author`)}
            </div>
          </th>
          <th scope="col">
            <div
              className="btn"
              style={{ fontWeight: "bold" }}
              onClick={() => {
                const sortFieldChoose = AUTHOR_NAME;
                let sortTypeChoose = "";
                if (sortField === AUTHOR_NAME && sortType === ASC) {
                  sortTypeChoose = DESC;
                } else {
                  sortTypeChoose = ASC;
                }
                props.onChangeSorting(sortFieldChoose, sortTypeChoose);
              }}
            >
              {(locale === LOCALE_RU && `имя автора`) ||
                (locale === LOCALE_EN && `name of author`)}
            </div>
          </th>
          <th scope="col" className="text-center">
            <div
              className="btn"
              style={{ fontWeight: "bold" }}
              onClick={() => {
                const sortFieldChoose = AUTHOR_COUNT_NEWS;
                let sortTypeChoose = "";
                if (sortField === AUTHOR_COUNT_NEWS && sortType === ASC) {
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
            <th className="text-center" scope="col">
              {(locale === LOCALE_RU && `изменить`) ||
                (locale === LOCALE_EN && `change`)}
            </th>
          )}
          {userRole === ROLE_ADMIN && (
            <th className="text-center" scope="col">
              {(locale === LOCALE_RU && `удалить новости`) ||
                (locale === LOCALE_EN && `delete all news`)}
            </th>
          )}
          {userRole === ROLE_ADMIN && (
            <th className="text-center" scope="col">
              {(locale === LOCALE_RU && `удалить`) ||
                (locale === LOCALE_EN && `delete`)}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {authorsList.map((author) => {
          return (
            <AuthorItem
              key={author.id}
              valueAuthor={author}
              valueUserRole={userRole}
              valueLocale={locale}
              onChangeUserRole={(userRole) => props.onChangeUserRole(userRole)}
              onChangeAuthor={() => props.onChangeAuthor()}
            />
          );
        })}
      </tbody>
    </table>
  );
};
export default AuthorsList;
