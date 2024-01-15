import { useState } from "react";
import {
  deleteCommentsByNewsIdQuery,
  getCommentsByNewsIdQuery,
} from "../../../../../../../query/Comment";
import {
  ROLE_ADMIN,
  ROLE_GUEST,
  ROLE_USER,
} from "../../../../../../../role/UserRole";
import CommentsList from "./CommentsList";
import ContentNewCommentForm from "./CreateNewCommentForm";
import { Button, Modal } from "react-bootstrap";
import { LOCALE_EN, LOCALE_RU } from "../../../../../../../locate/Locale";
import { validationJwtTokenAdmin } from "../../../../../../../query/Auth";
import { getJwtTokenLocaleStorageParam, removeJwtTokenLocaleStorageParam, setUserRoleLocaleStorageParam } from "../../../../../../../params/LocaleStorageParams";

const ModalViewComments = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;

  const newsId = props.valueNewsId;
  const newsCountComments = props.valueCountComments;

  const [newsComments, setNewsComments] = useState([]);

  const [isChangedNews, setIsChangedNews] = useState(false);

  const [isShowModalCommentsList, setIsShowModalCommentsList] = useState(false);
  const [
    isShowConfirmDeleteAllCommentsFromNewsBtns,
    setIsShowConfirmDeleteAllCommentsFromNewsBtns,
  ] = useState(false);
  const [isShowCreateCommentForm, setIsShowCreateCommentForm] = useState(false);

  const [responceException, setResponceException] = useState("");

  const getCommentsByNewsId = async () => {
    getCommentsByNewsIdQuery(newsId, "desc")
      .then(async (response) => {
        if (response.status === 200) {
          const responceJson = await response.json();
          setNewsComments(responceJson);
        } else if (response.status === 204) {
          setNewsComments([]);
        } else if (response.status === 401) {
          const responseJson = await response.json();
          console.log(`Что-то пошло не так: ${responseJson}`);
        } else if (response.status === 400) {
          const responseJson = await response.json();
          console.log(`Что-то пошло не так: ${responseJson}`);
        } else if (response.status === 403) {
          const responseJson = await response.json();
          console.log(`Что-то пошло не так: ${responseJson}`);
        } else {
          console.log(`Что-то пошло не так: ${response}`);
        }
      })
      .catch(async (error) => {
        console.log(`Что-то пошло не так: ${error}`);
      });
  };

  const deleteAllCommentsFromNews = async () => {
    const token = getJwtTokenLocaleStorageParam();
    validationJwtTokenAdmin(token)
      .then(async (responce) => {
        if (responce.ok) {
          deleteCommentsByNewsIdQuery(token, newsId)
            .then(async (response) => {
              if (response.ok) {
                props.onChangeNews();
                setResponceException("");
                setIsShowConfirmDeleteAllCommentsFromNewsBtns(false);
              } else if (response.status === 401) {
                const responseJson = await responce.json();
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
        setResponceException("Что-то пошло не так");
      });
  };

  return (
    <div>
      <div>
        <Button
          style={{ borderColor: "rgb(2, 33, 78)" }}
          variant=""
          onClick={() => {
            setIsShowModalCommentsList(true);
            if (newsCountComments > 0) {
              getCommentsByNewsId();
            }
          }}
        >
          {(locale === LOCALE_RU && `Показать комментарии `) ||
            (locale === LOCALE_EN && `Show commets `)}
          ({newsCountComments})
        </Button>
      </div>
      <div>
        <Modal
          size="xl"
          show={isShowModalCommentsList}
          backdrop="static"
          onHide={() => {
            if (isChangedNews) {
              props.onChangeNews();
            }
            setResponceException("");
            setIsShowModalCommentsList(false);
          }}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title
              className="w-100 pe-5"
              id="example-custom-modal-styling-title"
            >
              <div className="d-flex justify-content-between align-items-center">
                <h4>
                  {(locale === LOCALE_RU && `Комментарии`) ||
                    (locale === LOCALE_EN && `Сommets`)}
                </h4>
                {
                  <div>
                    {(userRole === ROLE_USER || userRole === ROLE_ADMIN) && (
                      <button
                        onClick={() =>
                          setIsShowCreateCommentForm(!isShowCreateCommentForm)
                        }
                        className="btn btn-primary"
                      >
                        <h6 className="mb-0">
                          {(locale === LOCALE_RU && `Добавить комментарий`) ||
                            (locale === LOCALE_EN && `Add comment`)}
                        </h6>
                      </button>
                    )}
                    {userRole === ROLE_ADMIN && (
                      <button
                        onClick={() =>
                          setIsShowConfirmDeleteAllCommentsFromNewsBtns(
                            !isShowConfirmDeleteAllCommentsFromNewsBtns
                          )
                        }
                        className="btn btn-primary ms-3"
                      >
                        <h6 className="mb-0">
                          {(locale === LOCALE_RU &&
                            `Удалить все комментарии`) ||
                            (locale === LOCALE_EN && `Delete all comments`)}
                        </h6>
                      </button>
                    )}
                  </div>
                }
              </div>
              {userRole === ROLE_ADMIN &&
                isShowConfirmDeleteAllCommentsFromNewsBtns && (
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
                        <p
                          style={{
                            margin: 0,
                            color: "white",
                            paddingLeft: "10px",
                          }}
                        >
                          {responceException}
                        </p>
                      </div>
                    )}
                    <h6 className="d-flex justify-content-between align-items-center mt-3">
                      {(locale === LOCALE_RU && `Вы уверены?`) ||
                        (locale === LOCALE_EN && `Are you sure?`)}
                      <button
                        onClick={() => {
                          deleteAllCommentsFromNews();
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
                          setIsShowConfirmDeleteAllCommentsFromNewsBtns(false);
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
                    </h6>
                  </div>
                )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {(userRole === ROLE_USER || userRole === ROLE_ADMIN) &&
                isShowCreateCommentForm && (
                  <ContentNewCommentForm
                    onAddComment={() => {
                      getCommentsByNewsId();
                      setIsShowCreateCommentForm(false);
                      setIsChangedNews(true);
                    }}
                    valueLocale={locale}
                    valueNewsId={newsId}
                    valueUserRole={userRole}
                    onChangeUserRole={(userRole) =>
                      props.onChangeUserRole(userRole)
                    }
                  />
                )}
              <CommentsList
                valueLocale={locale}
                onChangeComment={() => {
                  getCommentsByNewsId();
                  setIsChangedNews(true);
                }}
                valueUserRole={userRole}
                valueCommentsList={newsComments}
                onChangeUserRole={(userRole) =>
                  props.onChangeUserRole(userRole)
                }
              />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ModalViewComments;
