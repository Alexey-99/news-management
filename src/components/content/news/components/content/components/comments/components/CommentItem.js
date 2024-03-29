import { ROLE_ADMIN, ROLE_GUEST } from "../../../../../../../../role/UserRole";
import { useState } from "react";
import {
  deleteCommentQuery,
  updateCommentQuery,
} from "../../../../../../../../query/Comment";
import { validationJwtTokenAdmin } from "../../../../../../../../query/Auth";
import CustomDateTime from "../../../../../../../CustomDateTime";
import { LOCALE_EN, LOCALE_RU } from "../../../../../../../../locate/Locale";
import { getJwtTokenLocaleStorageParam, removeJwtTokenLocaleStorageParam, setUserRoleLocaleStorageParam } from "../../../../../../../../params/LocaleStorageParams";

const CommentItem = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;
  const [comment, setComment] = useState(props.valueComment);
  const [isShowChangeCommentForm, setIsShowChangeCommentForm] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const [responceException, setResponceException] = useState("");
  const [isShowConfirmDeleteComment, setIsShowConfirmDeleteComment] =
    useState(false);

  const changeComment = async () => {
    const token = getJwtTokenLocaleStorageParam();
    validationJwtTokenAdmin(token)
      .then(async (responce) => {
        if (responce.ok) {
          updateCommentQuery(token, {
            ...comment,
            content: commentContent,
          })
            .then(async (response) => {
              if (response.ok) {
                setComment({ ...comment, content: commentContent });
                setIsShowChangeCommentForm(false);
                props.onChangedComment();
                setResponceException("");
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
          setResponceException("Что-то пошло не так");
        }
      })
      .catch(async (error) => {
        setResponceException("Что-то пошло не так");
      });
  };

  const deleteComment = async () => {
    const token = getJwtTokenLocaleStorageParam();
    validationJwtTokenAdmin(token)
      .then(async (responce) => {
        if (responce.ok) {
          deleteCommentQuery(token, comment.id)
            .then(async (response) => {
              if (response.ok) {
                setComment("");
                props.onChangedComment();
                setResponceException("");
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
          setResponceException("Что-то пошло не так");
        }
      })
      .catch(async (error) => {
        setResponceException("Что-то пошло не так");
      });
  };

  const changeCommentsBtn = (
    <button
      className="me-2 ms-2 bg-transparent"
      style={{ border: "none" }}
      variant="primary"
      onClick={() => setIsShowChangeCommentForm(true)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="25"
        height="25"
        viewBox="0 0 32 32"
      >
        <polygon
          fill="#e6a71e"
          points="2.177,23.728 24.406,1.5 30.499,7.594 8.271,29.823 1.5,30.499"
        ></polygon>
        <rect
          width="4.172"
          height="8.618"
          x="23.892"
          y="1.713"
          fill="#e83815"
          transform="rotate(-45.001 25.978 6.022)"
        ></rect>
        <path
          fill="#fff"
          d="M8.896,29.697c-0.128,0-0.256-0.049-0.354-0.146l-6.094-6.094c-0.195-0.195-0.195-0.512,0-0.707	s0.512-0.195,0.707,0l6.094,6.094c0.195,0.195,0.195,0.512,0,0.707C9.152,29.648,9.024,29.697,8.896,29.697z"
        ></path>
        <path
          fill="#fff"
          d="M27.549,11.044c-0.128,0-0.256-0.049-0.354-0.146l-6.093-6.094c-0.195-0.195-0.195-0.512,0-0.707	s0.512-0.195,0.707,0l6.093,6.094c0.195,0.195,0.195,0.512,0,0.707C27.805,10.996,27.677,11.044,27.549,11.044z"
        ></path>
        <path
          fill="#302529"
          d="M0.383,31.615l0.834-8.341L24.406,0.086l7.508,7.508L8.726,30.782L0.383,31.615z M3.137,24.183	l-0.52,5.199l5.2-0.519l21.269-21.27l-4.68-4.68L3.137,24.183z"
        ></path>
      </svg>
    </button>
  );

  const deleteCommentsBtn = (
    <button
      onClick={() => {
        setIsShowConfirmDeleteComment(!isShowConfirmDeleteComment);
        setResponceException("");
      }}
      className="me-2 ms-2 bg-transparent"
      style={{ border: "none" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="30"
        height="30"
        viewBox="0 0 100 100"
      >
        <path
          fill="#f37e98"
          d="M25,30l3.645,47.383C28.845,79.988,31.017,82,33.63,82h32.74c2.613,0,4.785-2.012,4.985-4.617L75,30"
        ></path>
        <path
          fill="#f15b6c"
          d="M65 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S65 36.35 65 38zM53 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S53 36.35 53 38zM41 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S41 36.35 41 38zM77 24h-4l-1.835-3.058C70.442 19.737 69.14 19 67.735 19h-35.47c-1.405 0-2.707.737-3.43 1.942L27 24h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3h54c1.657 0 3-1.343 3-3S78.657 24 77 24z"
        ></path>
        <path
          fill="#1f212b"
          d="M66.37 83H33.63c-3.116 0-5.744-2.434-5.982-5.54l-3.645-47.383 1.994-.154 3.645 47.384C29.801 79.378 31.553 81 33.63 81H66.37c2.077 0 3.829-1.622 3.988-3.692l3.645-47.385 1.994.154-3.645 47.384C72.113 80.566 69.485 83 66.37 83zM56 20c-.552 0-1-.447-1-1v-3c0-.552-.449-1-1-1h-8c-.551 0-1 .448-1 1v3c0 .553-.448 1-1 1s-1-.447-1-1v-3c0-1.654 1.346-3 3-3h8c1.654 0 3 1.346 3 3v3C57 19.553 56.552 20 56 20z"
        ></path>
        <path
          fill="#1f212b"
          d="M77,31H23c-2.206,0-4-1.794-4-4s1.794-4,4-4h3.434l1.543-2.572C28.875,18.931,30.518,18,32.265,18h35.471c1.747,0,3.389,0.931,4.287,2.428L73.566,23H77c2.206,0,4,1.794,4,4S79.206,31,77,31z M23,25c-1.103,0-2,0.897-2,2s0.897,2,2,2h54c1.103,0,2-0.897,2-2s-0.897-2-2-2h-4c-0.351,0-0.677-0.185-0.857-0.485l-1.835-3.058C69.769,20.559,68.783,20,67.735,20H32.265c-1.048,0-2.033,0.559-2.572,1.457l-1.835,3.058C27.677,24.815,27.351,25,27,25H23z"
        ></path>
        <path
          fill="#1f212b"
          d="M61.5 25h-36c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h36c.276 0 .5.224.5.5S61.776 25 61.5 25zM73.5 25h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5S73.776 25 73.5 25zM66.5 25h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S66.776 25 66.5 25zM50 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v25.5c0 .276-.224.5-.5.5S52 63.776 52 63.5V38c0-1.103-.897-2-2-2s-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2v-3.5c0-.276.224-.5.5-.5s.5.224.5.5V73C53 74.654 51.654 76 50 76zM62 76c-1.654 0-3-1.346-3-3V47.5c0-.276.224-.5.5-.5s.5.224.5.5V73c0 1.103.897 2 2 2s2-.897 2-2V38c0-1.103-.897-2-2-2s-2 .897-2 2v1.5c0 .276-.224.5-.5.5S59 39.776 59 39.5V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C65 74.654 63.654 76 62 76z"
        ></path>
        <path
          fill="#1f212b"
          d="M59.5 45c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2C60 44.776 59.776 45 59.5 45zM38 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C41 74.654 39.654 76 38 76zM38 36c-1.103 0-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2V38C40 36.897 39.103 36 38 36z"
        ></path>
      </svg>
    </button>
  );

  const confirmDeleteCommentBtnsEl = (
    <div className="d-flex justify-content-around align-items-center">
      {(locale === LOCALE_RU && `Вы уверены?`) ||
        (locale === LOCALE_EN && `Are you sure?`)}
      <button
        onClick={() => deleteComment()}
        className="me-2 ms-2 btn btn-success"
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
          setIsShowConfirmDeleteComment(false);
          setResponceException("");
        }}
        className="me-2 ms-2 btn btn-success"
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

  let commentRowEl = "";
  if (comment !== "") {
    if (isShowChangeCommentForm && userRole === ROLE_ADMIN) {
      commentRowEl = (
        <>
          <td className="w-100">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (comment.content !== commentContent) {
                  changeComment();
                }
              }}
              className="needs-validation"
            >
              <input
                required
                className="form-control"
                placeholder={
                  (locale === LOCALE_RU && `Cодержимое комментария`) ||
                  (locale === LOCALE_EN && `Comment content`)
                }
                id="floatingCommentContent"
                defaultValue={comment.content}
                onChange={(event) => setCommentContent(event.target.value)}
                maxLength={255}
                minLength={3}
                pattern={"[^<>]{3,255}"}
              />
              <span>
                {(locale === LOCALE_RU && `Введённый комментарий:`) ||
                  (locale === LOCALE_EN && `Entered comment content:`)}
              </span>
              <p
                style={{
                  wordBreak: "break-all",
                  background: "white",
                  padding: "0 10px",
                }}
              >
                {commentContent}
              </p>
              {isShowChangeCommentForm && responceException.length > 0 && (
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
                    {(locale === LOCALE_RU && `Ок`) ||
                      (locale === LOCALE_EN && `Ok`)}
                  </h5>
                </button>
              </div>
            </form>
          </td>
          <td>
            <CustomDateTime
              valueDateTime={comment.modified}
              valueLocale={locale}
            />
          </td>
          {userRole === ROLE_ADMIN && (
            <td>
              <button
                style={{ borderRadius: "20px" }}
                className="btn btn-primary"
                onClick={() => {
                  setIsShowChangeCommentForm(false);
                  setResponceException("");
                }}
              >
                <h5 className="text-lowercase" style={{ margin: 0 }}>
                  {(locale === LOCALE_RU && `Отмена`) ||
                    (locale === LOCALE_EN && `Cancel`)}
                </h5>
              </button>
            </td>
          )}
          <td></td>
        </>
      );
    } else {
      commentRowEl = (
        <>
          <td className="w-100" style={{ wordBreak: "break-all" }}>
            <div>
              <p>{comment.content}</p>
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
            {isShowConfirmDeleteComment && confirmDeleteCommentBtnsEl}
          </td>
          <td>
            <CustomDateTime
              valueDateTime={comment.modified}
              valueLocale={locale}
            />
          </td>
          {userRole === ROLE_ADMIN && comment !== "" && (
            <td>{changeCommentsBtn}</td>
          )}
          {userRole === ROLE_ADMIN && comment !== "" && (
            <td>{deleteCommentsBtn}</td>
          )}
        </>
      );
    }
  }

  return (
    <>
      <tr>{commentRowEl}</tr>
    </>
  );
};

export default CommentItem;
