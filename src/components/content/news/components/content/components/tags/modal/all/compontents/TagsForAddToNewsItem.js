import { Button } from "react-bootstrap";
import {
  ROLE_ADMIN,
  ROLE_GUEST,
  ROLE_USER,
} from "../../../../../../../../../../role/UserRole";
import { useState } from "react";
import { addTagByIdToNewsByIdQuery } from "../../../../../../../../../../query/Tag";
import {
  getJwtTokenSessionStorageParam,
  removeJwtTokenSessionStorageParam,
  setUserRoleSessionStorageParam,
} from "../../../../../../../../../../params/SessionStorageParams";
import { validationJwtTokenUser } from "../../../../../../../../../../query/Auth";
import {
  LOCALE_EN,
  LOCALE_RU,
} from "../../../../../../../../../../locate/Locale";

const TagForAddToNewsItem = (props) => {
  const locale = props.valueLocale;
  const userRole = props.valueUserRole;
  const [tag] = useState(props.valueTag);
  const [isShowConfirmAddTagToNews, setIsShowConfirmAddTagToNews] =
    useState(false);
  const [responceException, setResponceException] = useState("");

  const addTagToNews = async () => {
    const newsId = props.valueNewsId;
    const token = getJwtTokenSessionStorageParam();
    validationJwtTokenUser(token)
      .then(async (responce) => {
        if (responce.ok) {
          addTagByIdToNewsByIdQuery(token, tag.id, newsId)
            .then(async (response) => {
              if (response.ok) {
                setResponceException("");
                props.onAddTagToNews(tag);
                setIsShowConfirmAddTagToNews(false);
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
              console.log(`Что-то пошло не так: ${error}`);
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
          console.log(`Что-то пошло не так: ${responce}`);
          setResponceException("Что-то пошло не так");
        }
      })
      .catch(async (error) => {
        console.log(`Что-то пошло не так: ${error}`);
        setResponceException("Что-то пошло не так");
      });
  };

  const confirmAddTagToNewsBtnsEl = (
    <div className="d-flex justify-content-between align-items-center">
      {(locale === LOCALE_RU && `Вы уверены?`) ||
        (locale === LOCALE_EN && `Are you sure?`)}
      <button
        onClick={() => {
          addTagToNews();
        }}
        className="me-2 ms-2 btn btn-outline-success"
        style={{ minWidth: "20%", borderRadius: "20px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="25"
          height="25"
          viewBox="0 0 48 48"
        >
          <path
            fill="#43A047"
            d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"
          ></path>
        </svg>
      </button>
      <button
        onClick={() => {
          setIsShowConfirmAddTagToNews(false);
          setResponceException("");
        }}
        className="me-2 ms-2 btn btn-outline-success"
        style={{ minWidth: "20%", borderRadius: "20px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="25"
          height="25"
          viewBox="0 0 48 48"
        >
          <linearGradient
            id="hbE9Evnj3wAjjA2RX0We2a_OZuepOQd0omj_gr1"
            x1="7.534"
            x2="27.557"
            y1="7.534"
            y2="27.557"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#f44f5a"></stop>
            <stop offset=".443" stopColor="#ee3d4a"></stop>
            <stop offset="1" stopColor="#e52030"></stop>
          </linearGradient>
          <path
            fill="url(#hbE9Evnj3wAjjA2RX0We2a_OZuepOQd0omj_gr1)"
            d="M42.42,12.401c0.774-0.774,0.774-2.028,0-2.802L38.401,5.58c-0.774-0.774-2.028-0.774-2.802,0	L24,17.179L12.401,5.58c-0.774-0.774-2.028-0.774-2.802,0L5.58,9.599c-0.774,0.774-0.774,2.028,0,2.802L17.179,24L5.58,35.599	c-0.774,0.774-0.774,2.028,0,2.802l4.019,4.019c0.774,0.774,2.028,0.774,2.802,0L42.42,12.401z"
          ></path>
          <linearGradient
            id="hbE9Evnj3wAjjA2RX0We2b_OZuepOQd0omj_gr2"
            x1="27.373"
            x2="40.507"
            y1="27.373"
            y2="40.507"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#a8142e"></stop>
            <stop offset=".179" stopColor="#ba1632"></stop>
            <stop offset=".243" stopColor="#c21734"></stop>
          </linearGradient>
          <path
            fill="url(#hbE9Evnj3wAjjA2RX0We2b_OZuepOQd0omj_gr2)"
            d="M24,30.821L35.599,42.42c0.774,0.774,2.028,0.774,2.802,0l4.019-4.019	c0.774-0.774,0.774-2.028,0-2.802L30.821,24L24,30.821z"
          ></path>
        </svg>
      </button>
    </div>
  );

  return (
    <tr>
      <td>
        {tag.name}
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
        {isShowConfirmAddTagToNews && confirmAddTagToNewsBtnsEl}
      </td>
      <td>
        {(userRole === ROLE_USER || userRole === ROLE_ADMIN) &&
          !props.valueIsHaveTagInNews && (
            <Button
              className="d-flex justify-content-center align-items-center"
              style={{ borderColor: "rgb(2, 33, 78)", margin: "0 auto" }}
              variant=""
              onClick={() => {
                setIsShowConfirmAddTagToNews(!isShowConfirmAddTagToNews);
                setResponceException("");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-plus-circle"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </Button>
          )}
      </td>
    </tr>
  );
};

export default TagForAddToNewsItem;
