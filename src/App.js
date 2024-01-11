import Header from "./components/header/Header";
import NewsContentSection from "./components/content/news/NewsContentSection";
import Footer from "./components/footer/Footer";
import { useState } from "react";
import { ROLE_ADMIN, ROLE_GUEST, ROLE_USER } from "./role/UserRole";
import { LOCALE_EN, LOCALE_RU } from "./locate/Locale";
import {
  getCodeContentSectionSessionStorageParam,
  getJwtTokenSessionStorageParam,
  getLocaleSessionStorageParam,
  getUserRoleSessionStorageParam,
  removeJwtTokenSessionStorageParam,
  setCodeContentSectionSessionStorageParam,
  setLocaleSessionStorageParam,
  setUserRoleSessionStorageParam,
} from "./params/SessionStorageParams";
import { validationJwtTokenAdmin, validationJwtTokenUser } from "./query/Auth";
import {
  CODE_CONTENT_SECTION_AUTHORS,
  CODE_CONTENT_SECTION_NEWS,
  CODE_CONTENT_SECTION_TAGS,
  CODE_CONTENT_SECTION_USERS,
} from "./code/CodeContentSection";
import TagsContentSection from "./components/content/tags/TagsContentSection";
import AuthorsContentSection from "./components/content/authors/AuthorsContentSection";
import UsersContentSection from "./components/content/users/UsersContentSection";

const App = () => {
  const [isNeedInit, setIsNeedInit] = useState(true);
  const [userRole, setRole] = useState(ROLE_GUEST);

  const findLocale = () => {
    let result = LOCALE_EN;
    const languageLocale = getLocaleSessionStorageParam();
    if (languageLocale !== null && languageLocale === LOCALE_RU) {
      result = LOCALE_RU;
    } else if (languageLocale !== null && languageLocale === LOCALE_EN) {
      result = LOCALE_EN;
    } else {
      setLocaleSessionStorageParam(LOCALE_EN);
      result = LOCALE_EN;
    }
    return result;
  };

  const [locale, setLocale] = useState(findLocale());
  const [contentSection, setContentSection] = useState();

  const findContentSection = (role, locale) => {
    let result = (
      <NewsContentSection
        valueLocale={locale}
        onChangeUserRole={(userRole) => setRole(userRole)}
        valueUserRole={role}
      />
    );
    const codeContentSectionSessionStorage =
      getCodeContentSectionSessionStorageParam();
    if (
      codeContentSectionSessionStorage !== null &&
      codeContentSectionSessionStorage === CODE_CONTENT_SECTION_TAGS
    ) {
      result = (
        <TagsContentSection
          valueLocale={locale}
          onChangeUserRole={(userRole) => setRole(userRole)}
          valueUserRole={role}
        />
      );
      setContentSection(result);
    }
    if (
      codeContentSectionSessionStorage !== null &&
      codeContentSectionSessionStorage === CODE_CONTENT_SECTION_USERS &&
      role === ROLE_ADMIN
    ) {
      result = (
        <UsersContentSection
          valueLocale={locale}
          onChangeUserRole={(userRole) => setRole(userRole)}
          valueUserRole={role}
        />
      );
      setContentSection(result);
    } else if (
      codeContentSectionSessionStorage !== null &&
      codeContentSectionSessionStorage === CODE_CONTENT_SECTION_AUTHORS
    ) {
      result = (
        <AuthorsContentSection
          valueLocale={locale}
          onChangeUserRole={(userRole) => setRole(userRole)}
          valueUserRole={role}
        />
      );
      setContentSection(result);
    } else if (
      codeContentSectionSessionStorage !== null &&
      codeContentSectionSessionStorage === CODE_CONTENT_SECTION_NEWS
    ) {
      setContentSection(result);
    } else {
      setContentSection(result);
      setCodeContentSectionSessionStorageParam(CODE_CONTENT_SECTION_NEWS);
    }
    return result;
  };

  const findUserRole = async () => {
    let result = ROLE_GUEST;
    const roleStorage = getUserRoleSessionStorageParam();
    if (roleStorage !== null && roleStorage !== "") {
      if (roleStorage === ROLE_USER) {
        const token = getJwtTokenSessionStorageParam();
        validationJwtTokenUser(token)
          .then((response) => {
            if (response.ok) {
              setUserRoleSessionStorageParam(ROLE_USER);
              setRole(ROLE_USER);
              result = ROLE_USER;
              const locale = findLocale();
              findContentSection(ROLE_USER, locale);
            } else {
              removeJwtTokenSessionStorageParam();
              setUserRoleSessionStorageParam(ROLE_GUEST);
              setRole(ROLE_GUEST);
              const locale = findLocale();
              findContentSection(ROLE_GUEST, locale);
            }
          })
          .catch(() => {
            removeJwtTokenSessionStorageParam();
            setUserRoleSessionStorageParam(ROLE_GUEST);
            setRole(ROLE_GUEST);
            const locale = findLocale();
            findContentSection(ROLE_GUEST, locale);
          });
      } else if (roleStorage === ROLE_ADMIN) {
        const token = getJwtTokenSessionStorageParam();
        validationJwtTokenAdmin(token)
          .then((response) => {
            if (response.ok) {
              setUserRoleSessionStorageParam(ROLE_ADMIN);
              setRole(ROLE_ADMIN);
              result = ROLE_ADMIN;
              const locale = findLocale();
              findContentSection(ROLE_ADMIN, locale);
            } else {
              setUserRoleSessionStorageParam(ROLE_GUEST);
              removeJwtTokenSessionStorageParam();
              setRole(ROLE_GUEST);
              const locale = findLocale();
              findContentSection(ROLE_GUEST, locale);
            }
          })
          .catch(() => {
            removeJwtTokenSessionStorageParam();
            setUserRoleSessionStorageParam(ROLE_GUEST);
            setRole(ROLE_GUEST);
            const locale = findLocale();
            findContentSection(ROLE_GUEST, locale);
          });
      } else {
        removeJwtTokenSessionStorageParam();
        setUserRoleSessionStorageParam(ROLE_GUEST);
        setRole(ROLE_GUEST);
        const locale = findLocale();
        findContentSection(ROLE_GUEST, locale);
      }
    } else {
      removeJwtTokenSessionStorageParam();
      setUserRoleSessionStorageParam(ROLE_GUEST);
      setRole(ROLE_GUEST);
      const locale = findLocale();
      findContentSection(ROLE_GUEST, locale);
    }
    return result;
  };

  if (isNeedInit) {
    setIsNeedInit(false);
    findUserRole();
  }

  return (
    <div className="vh-100">
      <div
        className="text-center"
        style={{
          color: "white",
          backgroundColor: "rgb(2, 33, 78)",
          opacity: "80%",
          fontWeight: "bold",
        }}
      >
        {(userRole === ROLE_ADMIN &&
          ((locale === LOCALE_EN && "Hello Admin") ||
            (locale === LOCALE_RU && "Привет администратор"))) ||
          (userRole === ROLE_USER &&
            ((locale === LOCALE_EN && "Hello user") ||
              (locale === LOCALE_RU && "Привет пользователь")))}
      </div>
      <Header
        valueCodeSection={getCodeContentSectionSessionStorageParam()}
        valueLocale={locale}
        valueUserRole={userRole}
        onChangeUserRole={(userRole) => {
          setRole(userRole);
          findContentSection(userRole, locale);
        }}
        onChangeLocale={(locale) => {
          setLocale(locale);
          findContentSection(userRole, locale);
          setLocaleSessionStorageParam(locale);
        }}
        onChangeSection={(section) => setContentSection(section)}
      />
      {contentSection}
      <Footer />
    </div>
  );
};

export default App;
