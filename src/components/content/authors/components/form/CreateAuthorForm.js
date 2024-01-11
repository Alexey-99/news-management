import { useState } from "react";
import {
  getJwtTokenSessionStorageParam,
  removeJwtTokenSessionStorageParam,
  setUserRoleSessionStorageParam,
} from "../../../../../params/SessionStorageParams";
import { validationJwtTokenUser } from "../../../../../query/Auth";
import { createAuthorQuery } from "../../../../../query/Author";
import { ROLE_GUEST } from "../../../../../role/UserRole";
import { LOCALE_EN, LOCALE_RU } from "../../../../../locate/Locale";

const CreateAuthorForm = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;

  const [authorName, setAuthorName] = useState("");
  const [responceException, setResponceException] = useState("");

  const createAuthor = async () => {
    const newAuthor = {
      name: authorName,
    };
    const token = getJwtTokenSessionStorageParam();
    validationJwtTokenUser(token)
      .then(async (responce) => {
        if (responce.ok) {
          createAuthorQuery(token, newAuthor)
            .then(async (response) => {
              if (response.status === 201) {
                setAuthorName("");
                props.onCreateAuthors();
              } else if (response.status === 401) {
                const responseJson = await response.json();
                setResponceException(responseJson.errorMessage);
                props.onChangeUserRole(ROLE_GUEST);
                setUserRoleSessionStorageParam(ROLE_GUEST);
                removeJwtTokenSessionStorageParam();
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
          setUserRoleSessionStorageParam(ROLE_GUEST);
          removeJwtTokenSessionStorageParam();
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
        {(locale === LOCALE_EN && "Creating author") ||
          (locale === LOCALE_RU && "Создание автора")}
      </h4>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createAuthor();
        }}
        className="needs-validation"
      >
        <div>
          <div className="form-floating mb-3">
            <input
              required
              type="text"
              className="form-control"
              id="floatingInputAuthorName"
              maxLength="15"
              minLength="3"
              pattern={"[^<>]{3,15}"}
              onChange={(event) => setAuthorName(event.target.value)}
              defaultValue={authorName}
            />
            <label htmlFor="floatingInputAuthorName">
              {(locale === LOCALE_RU && `Cодержимое комментария`) ||
                (locale === LOCALE_EN && `Comment content`)}
            </label>
          </div>
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

export default CreateAuthorForm;
