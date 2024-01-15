import { useState } from "react";
import { validationJwtTokenUser } from "../../../../../../../query/Auth";
import { createNewsQuery } from "../../../../../../../query/News";
import { ROLE_GUEST } from "../../../../../../../role/UserRole";
import { LOCALE_EN, LOCALE_RU } from "../../../../../../../locate/Locale";
import {
  getJwtTokenLocaleStorageParam,
  removeJwtTokenLocaleStorageParam,
  setUserRoleLocaleStorageParam,
} from "../../../../../../../params/LocaleStorageParams";

const CreateNewsForm = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;

  const [titleNews, setTitleNews] = useState("");
  const [contentNews, setContentNews] = useState("");
  const [authorLoginNews, setAuthorLoginNews] = useState("");
  const [responceException, setResponceException] = useState("");

  const createNews = async () => {
    const newNews = {
      title: titleNews,
      content: contentNews,
      authorName: authorLoginNews,
    };
    const token = getJwtTokenLocaleStorageParam();
    validationJwtTokenUser(token)
      .then(async (responce) => {
        if (responce.ok) {
          createNewsQuery(token, newNews)
            .then(async (response) => {
              if (response.ok) {
                props.onChangeNews();
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
              setResponceException(`Что-то пошло не так: ${error}`);
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
      .catch(async (error) => {
        setResponceException(`Что-то пошло не так: ${error}`);
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
          createNews();
        }}
        className="needs-validation"
      >
        <div>
          <h5>
            {(locale === LOCALE_RU && `Заголовок новости`) ||
              (locale === LOCALE_EN && `News title`)}
          </h5>
          <div className="form-floating mb-3">
            <input
              required
              type="text"
              className="form-control"
              id="floatingInputTitleNews"
              maxLength="30"
              minLength="5"
              pattern={"[^<>]{5,30}"}
              defaultValue={titleNews}
              onChange={(event) => setTitleNews(event.target.value)}
            />
            <label htmlFor="floatingInputTitleNews">
              {(locale === LOCALE_RU && `Введите заголовок новости`) ||
                (locale === LOCALE_EN && `Enter news title`)}
            </label>
          </div>
        </div>
        <div>
          <h5>
            {(locale === LOCALE_RU && `Контент новости`) ||
              (locale === LOCALE_EN && `News content`)}
          </h5>
          <div>
            <div className="form-floating mb-3">
              <input
                required
                type="text"
                className="form-control"
                id="floatingInputContentNews"
                maxLength="255"
                minLength="3"
                pattern={"[^<>]{3,255}"}
                defaultValue={contentNews}
                onChange={(event) => setContentNews(event.target.value)}
              />
              <label htmlFor="floatingInputContentNews">
                {(locale === LOCALE_RU && `Введите контент новости`) ||
                  (locale === LOCALE_EN && `Enter news content`)}
              </label>
            </div>
            <span>
              {" "}
              {(locale === LOCALE_RU && `Контент новости`) ||
                (locale === LOCALE_EN && `News content`)}
              :
            </span>
            <p
              style={{
                wordBreak: "break-all",
                background: "white",
                padding: "0 10px",
              }}
            >
              {contentNews}
            </p>
          </div>
        </div>
        <div>
          <h5>
            {(locale === LOCALE_RU && `Имя автора`) ||
              (locale === LOCALE_EN && `Author name`)}
          </h5>
          <div className="form-floating mb-3">
            <input
              required
              type="text"
              className="form-control"
              id="floatingInputAuthorNameNews"
              maxLength="15"
              minLength="3"
              pattern={"[^<>]{3,15}"}
              defaultValue={authorLoginNews}
              onChange={(event) => setAuthorLoginNews(event.target.value)}
            />
            <label htmlFor="floatingInputAuthorNameNews">
              {(locale === LOCALE_RU && `Введите имя автора`) ||
                (locale === LOCALE_EN && `Enter author name`)}
            </label>
          </div>
        </div>
        {responceException}
        <div>
          {responceException !== "" && (
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

export default CreateNewsForm;
