import { useState } from "react";
import { registrationUserQuery } from "../../../../query/User";
import { createJwtTokenQuery } from "../../../../query/Auth";
import {
  setExpiredDateJwtTokenLocaleStorageParam,
  setJwtTokenLocaleStorageParam,
  setUserLoginLocaleStorageParam,
  setUserRoleLocaleStorageParam,
} from "../../../../params/LocaleStorageParams";
import { LOCALE_EN, LOCALE_RU } from "../../../../locate/Locale";

const SignUpForm = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [responceException, setResponceException] = useState("");

  const registration = async () => {
    const registrationUser = {
      login: login,
      password: password,
      confirmPassword: confirmPassword,
    };
    registrationUserQuery(registrationUser)
      .then(async (response) => {
        if (response.ok) {
          const jwtTokenUser = {
            userName: login,
            password: password,
          };
          createJwtTokenQuery(jwtTokenUser)
            .then(async (response) => {
              if (response.ok) {
                const responseJson = await response.json();
                const token = responseJson.accessToken;
                const userRole = responseJson.userRole;
                const expiredDate = responseJson.expiredDate;
                const login = responseJson.login;
                setJwtTokenLocaleStorageParam(token);
                props.onChangeUserRole(userRole);
                setUserRoleLocaleStorageParam(userRole);
                setExpiredDateJwtTokenLocaleStorageParam(new Date(expiredDate));
                setUserLoginLocaleStorageParam(login);
              } else if (response.status === 400) {
                const responseJson = await response.json();
                setResponceException(responseJson.errorMessage);
              } else {
                console.log(`Что-то пошло не так;  ${response}`);
                setResponceException("Что-то пошло не так");
              }
            })
            .catch((error) => {
              console.log(`Что-то пошло не так;  ${error}`);
              setResponceException("Что-то пошло не так");
            });
        } else if (response.status === 401) {
          const responseJson = await response.json();
          setResponceException(responseJson.errorMessage);
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
        console.log(`Что-то пошло не так;  ${error}`);
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
      <form
        onSubmit={(event) => {
          event.preventDefault();
          registration();
        }}
        className="needs-validation"
      >
        <div>
          <h5 className="text-uppercase">
            {locale === LOCALE_EN && "login"}
            {locale === LOCALE_RU && "логин"}
          </h5>
          <div className="form-floating mb-3">
            <input
              required
              type="text"
              className="form-control"
              id="floatingInputLogin"
              maxLength="30"
              minLength="3"
              pattern={"[^<>]{3,30}"}
              defaultValue={login}
              onChange={(event) => setLogin(event.target.value)}
            />
            <label htmlFor="floatingInputLogin">
              {locale === LOCALE_EN && "Enter login"}
              {locale === LOCALE_RU && "Введите логин"}
            </label>
          </div>
        </div>
        <div>
          <h5 className="text-uppercase">
            {locale === LOCALE_EN && "Password"}
            {locale === LOCALE_RU && "пароль"}
          </h5>
          <div className="form-floating mb-3">
            <input
              required
              type="text"
              className="form-control"
              id="floatingInputPassword"
              maxLength="30"
              minLength="4"
              pattern={"[^<>]{4,30}"}
              defaultValue={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <label htmlFor="floatingInputPassword">
              {locale === LOCALE_EN && "Enter password"}
              {locale === LOCALE_RU && "Введите пароль"}
            </label>
          </div>
        </div>
        <div>
          <h5 className="text-uppercase">
            {locale === LOCALE_EN && "Enter password again"}
            {locale === LOCALE_RU && "Введите пароль ещё раз"}
          </h5>
          <div className="form-floating mb-3">
            <input
              required
              type="text"
              className="form-control"
              id="floatingInputConfirmPassword"
              maxLength="30"
              minLength="4"
              pattern={"[^<>]{4,30}"}
              defaultValue={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <label htmlFor="floatingInputConfirmPassword">
              {locale === LOCALE_EN && "Enter password again"}
              {locale === LOCALE_RU && "Введите пароль ещё раз"}
            </label>
          </div>
        </div>
        <div>
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
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
