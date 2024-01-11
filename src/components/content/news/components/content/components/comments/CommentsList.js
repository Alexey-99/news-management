import { LOCALE_EN, LOCALE_RU } from "../../../../../../../locate/Locale";
import { ROLE_ADMIN } from "../../../../../../../role/UserRole";
import CommentItem from "./components/CommentItem";

const CommentsList = (props) => {
  const userRole = props.valueUserRole;
  const commentsList = props.valueCommentsList;
  const locale = props.valueLocale;

  return (
    <div>
      <table className="table table-success table-striped table-hover">
        <thead>
          <tr>
            <th scope="col" className="text-center align-middle ps-3 pe-3">
              {(locale === LOCALE_RU && `контент`) ||
                (locale === LOCALE_EN && `content`)}
            </th>
            <th scope="col" className="text-center align-middle ps-3 pe-3">
              {(locale === LOCALE_RU && `дата изменения`) ||
                (locale === LOCALE_EN && `date of modification`)}
            </th>
            {userRole === ROLE_ADMIN && (
              <th scope="col" className="text-center align-middle ps-3 pe-3">
                {(locale === LOCALE_RU && `изменить`) ||
                  (locale === LOCALE_EN && `change`)}
              </th>
            )}
            {userRole === ROLE_ADMIN && (
              <th scope="col" className="text-center align-middle ps-3 pe-3">
                {(locale === LOCALE_RU && `удалить`) ||
                  (locale === LOCALE_EN && `delete`)}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {commentsList.map((comment) => (
            <CommentItem
              valueLocale={locale}
              onChangedComment={() => props.onChangeComment()}
              valueUserRole={userRole}
              key={comment.id}
              valueComment={comment}
              onChangeUserRole={(userRole) => props.onChangeUserRole(userRole)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommentsList;
