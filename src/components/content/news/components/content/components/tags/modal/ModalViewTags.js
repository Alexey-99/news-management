import { useState } from "react";
import { LOCALE_EN, LOCALE_RU } from "../../../../../../../../locate/Locale";
import {
  getAllTagsByNewsIdQuery,
  getAllTagsQuery,
} from "../../../../../../../../query/Tag";
import AccordionAllTagsForAddToNews from "./all/AccordionAllTagsForAddToNews";
import TableHaveNewsTags from "./having/TableHaveNewsTags";
import { Button, Modal } from "react-bootstrap";
import { ROLE_ADMIN, ROLE_GUEST } from "../../../../../../../../role/UserRole";
import {
  getJwtTokenSessionStorageParam,
  removeJwtTokenSessionStorageParam,
  setUserRoleSessionStorageParam,
} from "../../../../../../../../params/SessionStorageParams";
import { validationJwtTokenAdmin } from "../../../../../../../../query/Auth";
import { removeAllTagsFromNewsByNewsIdQuery } from "../../../../../../../../query/News";

const ModalViewTags = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;

  const newsId = props.valueNewsId;
  const newsCountHavingTags = props.valueCountHavingTags;

  const [isNeedInit, setIsNeedInit] = useState(true);
  const [havingNewsTags, setHavingNewsTags] = useState([]);
  const [allTags, setAllTags] = useState([]);

  const [isShowViewTagModal, setIsShowViewTagModal] = useState(false);
  const [isChangedNews, setIsChangedNews] = useState(false);
  const [
    isShowConfirmRemoveAllTAgsFromNewsBtns,
    setIsShowConfirmRemoveAllTAgsFromNewsBtns,
  ] = useState(false);

  const [responceException, setResponceException] = useState("");

  const getAllTags = async (havingNewsTags) => {
    getAllTagsQuery("ASC")
      .then(async (response) => {
        if (response.status === 200) {
          const responceJson = await response.json();
          const tags = responceJson.map((tag) => {
            return {
              tag: tag,
              isHaveTagInNews:
                havingNewsTags.filter((newsTag) => newsTag.id === tag.id)
                  .length > 0,
            };
          });
          setAllTags(tags);
        } else if (response.status === 204) {
          setAllTags([]);
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

  const getAllTagsByNewsId = async () => {
    getAllTagsByNewsIdQuery(newsId, "ASC")
      .then(async (response) => {
        if (response.status === 200) {
          const responceJson = await response.json();
          setHavingNewsTags(responceJson);
          getAllTags(responceJson);
        } else {
          getAllTags([]);
          console.log(`Что-то пошло не так: ${response}`);
        }
      })
      .catch(async (error) => {
        getAllTags([]);
        console.log(`Что-то пошло не так: ${error}`);
      });
  };

  if (isNeedInit) {
    setIsNeedInit(false);
    if (newsCountHavingTags > 0) {
      getAllTagsByNewsId();
    } else {
      getAllTags([]);
    }
  }

  const removeAllTagsFromNews = async () => {
    const token = getJwtTokenSessionStorageParam();
    validationJwtTokenAdmin(token)
      .then(async (responce) => {
        if (responce.ok) {
          removeAllTagsFromNewsByNewsIdQuery(token, newsId)
            .then(async (response) => {
              if (response.ok) {
                setIsChangedNews(true);
                setResponceException("");
                setIsShowConfirmRemoveAllTAgsFromNewsBtns(false);
                setHavingNewsTags([]);
                getAllTags([]);
              } else if (response.status === 401) {
                const responseJson = await responce.json();
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
              setResponceException(`Что-то пошло не так: ${error}`);
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
      .catch(async (error) => {
        setResponceException(`Что-то пошло не так: ${error}`);
      });
  };

  return (
    <div>
      <div>
        <Button
          style={{ borderColor: "rgb(2, 33, 78)" }}
          variant=""
          onClick={() => {
            setIsShowViewTagModal(true);
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
      </div>
      <div>
        <Modal
          size="xl"
          show={isShowViewTagModal}
          backdrop="static"
          onHide={() => {
            console.log(isChangedNews)
            if (isChangedNews) {
              props.onChangeNews();
            }
            setIsShowViewTagModal(false);
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
                  {(locale === LOCALE_RU && `Теги`) ||
                    (locale === LOCALE_EN && `Tags`)}
                </h4>
                <div>
                  {userRole === ROLE_ADMIN && (
                    <button
                      onClick={() =>
                        setIsShowConfirmRemoveAllTAgsFromNewsBtns(
                          !isShowConfirmRemoveAllTAgsFromNewsBtns
                        )
                      }
                      className="btn btn-primary"
                    >
                      <h6 className="mb-0">
                        {(locale === LOCALE_RU &&
                          `Удалить все теги из новости`) ||
                          (locale === LOCALE_EN && `Remove all tags from news`)}
                      </h6>
                    </button>
                  )}
                </div>
              </div>
              {userRole === ROLE_ADMIN &&
                isShowConfirmRemoveAllTAgsFromNewsBtns && (
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
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      {(locale === LOCALE_RU && `Вы уверены?`) ||
                        (locale === LOCALE_EN && `Are you sure?`)}
                      <button
                        onClick={() => {
                          removeAllTagsFromNews();
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
                          setIsShowConfirmRemoveAllTAgsFromNewsBtns(false);
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
                  </div>
                )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5 className="text-center">
              {(locale === LOCALE_RU && `Теги имеющиеся у новости`) ||
                (locale === LOCALE_EN && `Tags from this news`)}
            </h5>
            <TableHaveNewsTags
              valueLocale={locale}
              valueUserRole={userRole}
              valueNewsTags={havingNewsTags}
              valueNewsId={newsId}
              onDeleteTagFromNews={() => {
                getAllTagsByNewsId(newsId);
                setIsChangedNews(true);
              }}
              onChangeUserRole={(userRole) => props.onChangeUserRole(userRole)}
            />
            <AccordionAllTagsForAddToNews
              valueLocale={locale}
              onAddTag={() => {
                getAllTagsByNewsId(newsId);
                setIsChangedNews(true);
              }}
              valueUserRole={userRole}
              valueNewsTags={havingNewsTags}
              valueNewsId={newsId}
              valueAllTags={allTags}
              onChangeUserRole={(userRole) => props.onChangeUserRole(userRole)}
            />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ModalViewTags;
