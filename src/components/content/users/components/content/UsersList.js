import { LOCALE_EN, LOCALE_RU } from "../../../../../locate/Locale";
import { ROLE_ADMIN } from "../../../../../role/UserRole";
import { USER_ID, USER_LOGIN, USER_ROLE } from "../sort/SortField";
import { ASC, DESC } from "../sort/SortType";
import UserItem from "./components/UserItem";

const UsersList = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;
  const usersList = props.valueUsersList;
  const sortType = props.valueSortType;
  const sortField = props.valueSortField;

  return (
    <table className="table table-success table-striped table-hover">
      <thead>
        <tr>
          <th
            scope="col"
            className="text-center"
            style={{ width: "min-content" }}
          >
            <div
              className="btn"
              style={{ fontWeight: "bold" }}
              onClick={() => {
                const sortFieldChoose = USER_ID;
                let sortTypeChoose = "";
                if (sortField === USER_ID && sortType === ASC) {
                  sortTypeChoose = DESC;
                } else {
                  sortTypeChoose = ASC;
                }
                props.onChangeSorting(sortFieldChoose, sortTypeChoose);
              }}
            >
              {(locale === LOCALE_RU && `номер пользователя`) ||
                (locale === LOCALE_EN && `number of user`)}
            </div>
          </th>
          <th scope="col" className="text-center">
            <div
              className="btn"
              style={{ fontWeight: "bold" }}
              onClick={() => {
                const sortFieldChoose = USER_LOGIN;
                let sortTypeChoose = "";
                if (sortField === USER_LOGIN && sortType === ASC) {
                  sortTypeChoose = DESC;
                } else {
                  sortTypeChoose = ASC;
                }
                props.onChangeSorting(sortFieldChoose, sortTypeChoose);
              }}
            >
              {(locale === LOCALE_RU && `логин`) ||
                (locale === LOCALE_EN && `login`)}
            </div>
          </th>
          <th scope="col" className="text-center">
            <div
              className="btn"
              style={{ fontWeight: "bold" }}
              onClick={() => {
                const sortFieldChoose = USER_ROLE;
                let sortTypeChoose = "";
                if (sortField === USER_ROLE && sortType === ASC) {
                  sortTypeChoose = DESC;
                } else {
                  sortTypeChoose = ASC;
                }
                props.onChangeSorting(sortFieldChoose, sortTypeChoose);
              }}
            >
              {(locale === LOCALE_RU && `роль`) ||
                (locale === LOCALE_EN && `role`)}
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
              {(locale === LOCALE_RU && `удалить`) ||
                (locale === LOCALE_EN && `delete`)}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {usersList.map((user) => {
          return (
            <UserItem
              key={user.id}
              valueUser={user}
              valueUserRole={userRole}
              valueLocale={locale}
              onChangeUserRole={(userRole) => props.onChangeUserRole(userRole)}
              onChangeUser={() => props.onChangeUser()}
            />
          );
        })}
      </tbody>
    </table>
  );
};
export default UsersList;
