import { useState } from "react";
import { LOCALE_EN, LOCALE_RU } from "../../../../../locate/Locale";
import { validationJwtTokenAdmin } from "../../../../../query/Auth";
import { changeUserLoginQuery } from "../../../../../query/User";
import { ROLE_GUEST } from "../../../../../role/UserRole";
import {
  getJwtTokenLocaleStorageParam,
  removeJwtTokenLocaleStorageParam,
  setUserRoleLocaleStorageParam,
} from "../../../../../params/LocaleStorageParams";

const ChangeUserLoginForm = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;

  const userId = props.valueUserId;

  const [newLogin, setNewLogin] = useState(props.valueUserLogin);
  const [responceException, setResponceException] = useState("");
  const [rolesList, setRolesList] = useState([]);

  const changeLoginUser = async () => {
    const token = getJwtTokenLocaleStorageParam();
    validationJwtTokenAdmin(token)
      .then(async (responce) => {
        if (responce.ok) {
          changeUserLoginQuery(token, userId, newLogin)
            .then(async (response) => {
              if (response.ok) {
                props.onChangeUser();
                setResponceException("");
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
                console.log(`Что-то пошло не так: ${response}`);
                setResponceException("Что-то пошло не так");
              }
            })
            .catch(async (error) => {
              console.log(`Что-то пошло не так:  ${error}`);
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
          console.log(`Что-то пошло не так: ${responce}`);
          setResponceException("Что-то пошло не так");
        }
      })
      .catch(async (error) => {
        console.log(`Что-то пошло не так: ${error}`);
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
        {(locale === LOCALE_RU && `Изменение логина пользователя`) ||
          (locale === LOCALE_EN && `Change login of user`)}
      </h4>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          changeLoginUser();
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
              maxLength="30"
              minLength="4"
              pattern={"[^<>]{4,30}"}
              onChange={(event) => setNewLogin(event.target.value)}
              defaultValue={newLogin}
            />
            <label htmlFor="floatingInputAuthorName">
              {(locale === LOCALE_RU && `Введите имя автора`) ||
                (locale === LOCALE_EN && `Enter author name`)}
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

export default ChangeUserLoginForm;
