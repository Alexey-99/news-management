import { useState } from "react";
import { createCommentQuery } from "../../../../../../../query/Comment";
import { validationJwtTokenUser } from "../../../../../../../query/Auth";
import { ROLE_GUEST } from "../../../../../../../role/UserRole";
import { LOCALE_EN, LOCALE_RU } from "../../../../../../../locate/Locale";
import { getJwtTokenLocaleStorageParam, removeJwtTokenLocaleStorageParam, setUserRoleLocaleStorageParam } from "../../../../../../../params/LocaleStorageParams";

const ContentNewCommentForm = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;

  const [contentNewComment, setContentNewComment] = useState();
  const [responceException, setResponceException] = useState("");

  const createNewComment = async () => {
    const newComment = {
      content: contentNewComment,
      newsId: props.valueNewsId,
    };
    const token = getJwtTokenLocaleStorageParam();
    validationJwtTokenUser(token)
      .then(async (responce) => {
        if (responce.ok) {
          createCommentQuery(token, newComment)
            .then(async (response) => {
              if (response.status === 201) {
                const responseJson = await response.json();
                setContentNewComment("");
                props.onAddComment(responseJson);
                props.onChangeComment();
              } else if (response.status === 401) {
                const responseJson = await response.json();
                setResponceException(responseJson.errorMessage);
                props.onChangeUserRole(ROLE_GUEST);
                setUserRoleLocaleStorageParam(ROLE_GUEST);
                removeJwtTokenLocaleStorageParam();
              } else if (response.status === 400) {
                const responseJson = await response.json();
                setResponceException(responseJson.errorMessage);
              } else if (response.status === 403) {
                const responseJson = await response.json();
                setResponceException(responseJson.errorMessage);
              } else {
                setResponceException("Что-то пошло не так");
              }
            })
            .catch(async (error) => {
              setResponceException("Что-то пошло не так");
            });
        } else if (responce.status === 401) {
          const responseJson = await responce.json();
          setResponceException(responseJson.errorMessage);
          props.onChangeUserRole(ROLE_GUEST);
          setUserRoleLocaleStorageParam(ROLE_GUEST);
          removeJwtTokenLocaleStorageParam();
        } else if (responce.status === 403) {
          const responseJson = await responce.json();
          setResponceException(responseJson.errorMessage);
        } else {
          setResponceException("Что-то пошло не так");
        }
      })
      .catch(async () => {
        setResponceException("Что-то пошло не так");
      });
  };

  return (
    <div
      style={{
        border: "1px",
        backgroundColor: "rgb(142, 137, 243)",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "20px",
      }}
    >
      <h4 className="text-center mb-3">
        {(locale === LOCALE_RU && `Добавление комментария`) ||
          (locale === LOCALE_EN && `Adding a comment`)}
      </h4>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createNewComment();
        }}
        className="needs-validation"
      >
        <div>
          <div className="form-floating mb-3">
            <input
              required
              type="text"
              className="form-control"
              id="floatingInputContent"
              maxLength="255"
              minLength="3"
              pattern={"[^<>]{3,255}"}
              onChange={(event) => setContentNewComment(event.target.value)}
            />
            <label htmlFor="floatingInputContent">
              {(locale === LOCALE_RU && `Cодержимое комментария`) ||
                (locale === LOCALE_EN && `Comment content`)}
            </label>
          </div>
          <span>
            {(locale === LOCALE_RU && `Введённый комментарий:`) ||
              (locale === LOCALE_EN && `Entered comment content:`)}
          </span>
          <p
            style={{
              wordBreak: "break-all",
              background: "white",
              padding: "0 10px",
            }}
          >
            {contentNewComment}
          </p>
        </div>
        {responceException.length > 0 && (
          <div
            style={{
              background: "#ff000073",
              padding: "5px",
              margin: "5px",
              borderRadius: "20px",
            }}
          >
            <p style={{ margin: 0, color: "white", paddingLeft: "10px" }}>
              {responceException}
            </p>
          </div>
        )}
        <div className="w-100 d-flex justify-content-center align-items-center">
          <button
            style={{ borderRadius: "20px", padding: "10px 40px" }}
            type="submit"
            className="btn btn-primary"
          >
            <h5 className="text-lowercase" style={{ margin: 0 }}>
              ok
            </h5>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentNewCommentForm;
