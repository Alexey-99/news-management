import { Modal } from "react-bootstrap";
import {
  removeJwtTokenSessionStorageParam,
  setCodeContentSectionSessionStorageParam,
  setUserRoleSessionStorageParam,
} from "../../params/SessionStorageParams.js";
import { ROLE_ADMIN, ROLE_GUEST, ROLE_USER } from "../../role/UserRole.js";
import Logo from "./components/HeaderLogo.js";
import { useState } from "react";
import SignUpForm from "./components/sign/SignUpForm.js";
import SignInForm from "./components/sign/SignInForm.js";
import TagsContentSection from "../content/tags/TagsContentSection.js";
import NewsContentSection from "../content/news/NewsContentSection.js";
import {
  CODE_CONTENT_SECTION_AUTHORS,
  CODE_CONTENT_SECTION_NEWS,
  CODE_CONTENT_SECTION_TAGS,
  CODE_CONTENT_SECTION_USERS,
} from "../../code/CodeContentSection.js";
import AuthorsContentSection from "../content/authors/AuthorsContentSection.js";
import { LOCALE_EN, LOCALE_RU } from "../../locate/Locale.js";
import UsersContentSection from "../content/users/UsersContentSection.js";

const Header = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;
  const codeSection = props.valueCodeSection;

  const [isShowModalSign, setIsShowModalSign] = useState(false);
  const [isActiveBtnSignUpForm, setIsActiveBtnSignUpForm] = useState(false);
  const [isActiveBtnSignInForm, setIsActiveBtnSignInForm] = useState(true);

  const modalSign = (
    <Modal
      size="xl"
      show={isShowModalSign}
      backdrop="static"
      onHide={() => {
        setIsShowModalSign(false);
        setIsActiveBtnSignInForm(true);
        setIsActiveBtnSignUpForm(false);
      }}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title
          className="w-100 pe-5"
          id="example-custom-modal-styling-title"
        ></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-around align-items-center mb-3">
          <button
            className={`btn btn-success text-uppercase ${
              isActiveBtnSignInForm && "active"
            }`}
            style={{
              borderRadius: "20px",
            }}
            onClick={() => {
              setIsActiveBtnSignUpForm(false);
              setIsActiveBtnSignInForm(true);
            }}
          >
            <h5 className="mb-0" style={{ padding: "5px 10px" }}>
              {(locale === LOCALE_EN && "sign in") ||
                (locale === LOCALE_RU && "войти")}
            </h5>
          </button>
          <button
            className={`btn btn-success text-uppercase ${
              isActiveBtnSignUpForm && "active"
            }`}
            style={{
              borderRadius: "20px",
            }}
            onClick={() => {
              setIsActiveBtnSignInForm(false);
              setIsActiveBtnSignUpForm(true);
            }}
          >
            <h5 className="mb-0" style={{ padding: "5px 10px" }}>
              {(locale === LOCALE_EN && "sign up") ||
                (locale === LOCALE_RU && "регистрация")}
            </h5>
          </button>
        </div>
        {isActiveBtnSignInForm && (
          <SignInForm
            valueLocale={locale}
            valueUserRole={userRole}
            onChangeUserRole={(userRole) => {
              props.onChangeUserRole(userRole);
              setIsShowModalSign(false);
              setUserRoleSessionStorageParam(userRole);
            }}
          />
        )}
        {isActiveBtnSignUpForm && (
          <SignUpForm
            valueLocale={locale}
            valueUserRole={userRole}
            onChangeUserRole={(userRole) => {
              props.onChangeUserRole(userRole);
              setIsShowModalSign(false);
              setUserRoleSessionStorageParam(userRole);
            }}
          />
        )}
      </Modal.Body>
    </Modal>
  );

  return (
    <header
      className="w-100 pt-4 pb-4 sticky-top"
      style={{ backgroundColor: "#02214e" }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div
            className="d-flex align-items-center justify-content-start"
            style={{ width: "70%" }}
          >
            <Logo />
            <div>
              <button
                className={`btn ${
                  codeSection === CODE_CONTENT_SECTION_NEWS && "active"
                }`}
                style={{ color: "white" }}
                onClick={() => {
                  props.onChangeSection(
                    <NewsContentSection
                      valueLocale={props.valueLocale}
                      onChangeUserRole={(userRole) => {
                        props.onChangeUserRole(userRole);
                      }}
                      valueUserRole={userRole}
                    />
                  );
                  setCodeContentSectionSessionStorageParam(
                    CODE_CONTENT_SECTION_NEWS
                  );
                }}
              >
                <h4
                  className="text-uppercase mb-0 d-flex justify-content-start flex-column"
                  style={{ color: "white" }}
                >
                  {(locale === LOCALE_EN && "news") ||
                    (locale === LOCALE_RU && "новости")}
                </h4>
              </button>
            </div>
            <div>
              <button
                className={`btn ${
                  codeSection === CODE_CONTENT_SECTION_TAGS && "active"
                }`}
                style={{ color: "white" }}
                onClick={() => {
                  props.onChangeSection(
                    <TagsContentSection
                      valueLocale={props.valueLocale}
                      onChangeUserRole={(userRole) =>
                        props.onChangeUserRole(userRole)
                      }
                      valueUserRole={userRole}
                    />
                  );
                  setCodeContentSectionSessionStorageParam(
                    CODE_CONTENT_SECTION_TAGS
                  );
                }}
              >
                <h4
                  className="text-uppercase mb-0 d-flex justify-content-start flex-column"
                  style={{ color: "white" }}
                >
                  {(locale === LOCALE_EN && "tags") ||
                    (locale === LOCALE_RU && "теги")}
                </h4>
              </button>
            </div>
            <div>
              <button
                className={`btn ${
                  codeSection === CODE_CONTENT_SECTION_AUTHORS && "active"
                }`}
                style={{ color: "white" }}
                onClick={() => {
                  props.onChangeSection(
                    <AuthorsContentSection
                      valueLocale={props.valueLocale}
                      onChangeUserRole={(userRole) =>
                        props.onChangeUserRole(userRole)
                      }
                      valueUserRole={userRole}
                    />
                  );
                  setCodeContentSectionSessionStorageParam(
                    CODE_CONTENT_SECTION_AUTHORS
                  );
                }}
              >
                <h4
                  className="text-uppercase mb-0 d-flex justify-content-start flex-column"
                  style={{ color: "white" }}
                >
                  {locale === LOCALE_EN && "authors"}
                  {locale === LOCALE_RU && "авторы"}
                </h4>
              </button>
            </div>
            {userRole === ROLE_ADMIN && (
              <div>
                <button
                  className={`btn ${
                    codeSection === CODE_CONTENT_SECTION_USERS && "active"
                  }`}
                  style={{ color: "white" }}
                  onClick={() => {
                    props.onChangeSection(
                      <UsersContentSection
                        valueLocale={props.valueLocale}
                        onChangeUserRole={(userRole) =>
                          props.onChangeUserRole(userRole)
                        }
                        valueUserRole={userRole}
                      />
                    );
                    setCodeContentSectionSessionStorageParam(
                      CODE_CONTENT_SECTION_USERS
                    );
                  }}
                >
                  <h4
                    className="text-uppercase mb-0 d-flex justify-content-start flex-column"
                    style={{ color: "white" }}
                  >
                    {locale === LOCALE_EN && "users"}
                    {locale === LOCALE_RU && "пользователи"}
                  </h4>
                </button>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {userRole === ROLE_GUEST && (
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <button className="btn" style={{ color: "white" }}>
                      <h4
                        className="text-uppercase ms-2 d-flex justify-content-start flex-column"
                        style={{ color: "white" }}
                        onClick={() => setIsShowModalSign(true)}
                      >
                        {(locale === LOCALE_EN && "sign in / sign up") ||
                          (locale === LOCALE_RU && "вход / регистрация")}
                      </h4>
                    </button>
                    {modalSign}
                  </div>
                </div>
              )}
              {(userRole === ROLE_USER || userRole === ROLE_ADMIN) && (
                <div>
                  <button className="btn" style={{ color: "white" }}>
                    <h4
                      className="text-uppercase ms-2 d-flex justify-content-start flex-column"
                      style={{ color: "white" }}
                      onClick={() => {
                        props.onChangeUserRole(ROLE_GUEST);
                        removeJwtTokenSessionStorageParam();
                        setUserRoleSessionStorageParam(ROLE_GUEST);
                      }}
                    >
                      {(locale === LOCALE_EN && "sign out") ||
                        (locale === LOCALE_RU && "выйти")}
                    </h4>
                  </button>
                </div>
              )}
            </div>
            <select
              required
              style={{ borderRadius: "0" }}
              onChange={(event) => props.onChangeLocale(event.target.value)}
              className="form-select text-uppercase w-auto ms-4"
              defaultValue={locale}
            >
              <option value={LOCALE_EN}>En</option>
              <option value={LOCALE_RU}>Ru</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
