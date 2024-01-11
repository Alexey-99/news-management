import { LOCALE_EN, LOCALE_RU } from "../../../../../../../../../locate/Locale";
import {
  ROLE_ADMIN,
  ROLE_USER,
} from "../../../../../../../../../role/UserRole";
import HaveNewsTagItem from "./components/HaveNewsTagItem";

const TableHaveNewsTags = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;
  const tags = props.valueNewsTags;

  return (
    <table className="table table-success table-striped table-hover">
      <thead>
        <tr>
          <th style={{ width: "80%" }} scope="col">
            {(locale === LOCALE_RU && `название тега`) ||
              (locale === LOCALE_EN && `tag name`)}
          </th>
          {(userRole === ROLE_USER || userRole === ROLE_ADMIN) && (
            <th className="text-center" scope="col">
              {(locale === LOCALE_RU && `удалить из новости`) ||
                (locale === LOCALE_EN && `remove from news`)}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {tags.map((tag) => {
          return (
            <HaveNewsTagItem
              onChangedTag={() => props.onChangedTag()}
              valueUserRole={userRole}
              valueLocale={locale}
              key={tag.id}
              valueTag={tag}
              valueNewsId={props.valueNewsId}
              onDeleteTagFromNews={(tag) => props.onDeleteTagFromNews(tag)}
              onChangeUserRole={(userRole) => props.onChangeUserRole(userRole)}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default TableHaveNewsTags;
