import { useState } from "react";
import { LOCALE_EN, LOCALE_RU } from "../../../../../locate/Locale";
import { validationJwtTokenAdmin } from "../../../../../query/Auth";
import { changeUserRoleQuery } from "../../../../../query/User";
import { ROLE_GUEST } from "../../../../../role/UserRole";
import { getAllRolesQuery } from "../../../../../query/Role";
import {
  getJwtTokenLocaleStorageParam,
  removeJwtTokenLocaleStorageParam,
  setUserRoleLocaleStorageParam,
} from "../../../../../params/LocaleStorageParams";

const ChangeUserRoleForm = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;

  const userLogin = props.valueUserLogin;

  const [choosedRoleId, setChoosedRoleId] = useState(props.valueUserRoleId);
  const [responceException, setResponceException] = useState("");
  const [rolesList, setRolesList] = useState([]);

  const [isNeedInit, setIsNeedInit] = useState(true);

  const changeRoleUser = async () => {
    const token = getJwtTokenLocaleStorageParam();
    validationJwtTokenAdmin(token)
      .then(async (responce) => {
        if (responce.ok) {
          changeUserRoleQuery(token, userLogin, choosedRoleId)
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

  const getAllRoles = async () => {
    const token = getJwtTokenLocaleStorageParam();
    validationJwtTokenAdmin(token)
      .then(async (responce) => {
        if (responce.ok) {
          getAllRolesQuery(token)
            .then(async (responceGetAllRoles) => {
              if (responceGetAllRoles.status === 204) {
                setRolesList([]);
                setResponceException("");
              } else if (responceGetAllRoles.status === 200) {
                const responceJSON = await responceGetAllRoles.json();
                setRolesList(responceJSON);
                setResponceException("");
              } else if (responceGetAllRoles.status === 401) {
                const responceJSON = await responceGetAllRoles.json();
                setResponceException(responceJSON.errorMessage);
                props.onChangeUserRole(ROLE_GUEST);
                setUserRoleLocaleStorageParam(ROLE_GUEST);
                removeJwtTokenLocaleStorageParam();
              } else if (responceGetAllRoles.status === 400) {
                const responceJSON = await responceGetAllRoles.json();
                setResponceException(responceJSON.errorMessage);
              } else if (responceGetAllRoles.status === 403) {
                setResponceException(
                  "У вас не достаточно прав на данную оперцию."
                );
              } else {
                console.log(`Что-то пошло не так: ${responceGetAllRoles}`);
                setResponceException("Что-то пошло не так");
              }
            })
            .catch(async (error) => {
              console.log(`Что-то пошло не так: ${error}`);
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

  if (isNeedInit) {
    setIsNeedInit(false);
    getAllRoles();
  }

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
        {(locale === LOCALE_RU && `Изменение роли пользователя`) ||
          (locale === LOCALE_EN && `Change user role`)}
      </h4>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          changeRoleUser();
        }}
        className="needs-validation"
      >
        <div>
          <h6>
            {(locale === LOCALE_RU && `Выберите роль`) ||
              (locale === LOCALE_EN && `Choose user role`)}
          </h6>
          {rolesList.length > 0 && (
            <select
              required
              style={{ borderRadius: "0" }}
              onChange={(event) => setChoosedRoleId(event.target.value)}
              className="form-select text-uppercase mb-5"
              defaultValue={choosedRoleId}
            >
              {rolesList.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          )}
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

export default ChangeUserRoleForm;
