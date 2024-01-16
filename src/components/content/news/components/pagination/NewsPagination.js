import { PAGE_SIZE_VALUES } from "./PageSizeValues";

const NewsPagination = (props) => {
  const numberPage = props.valueNumberPage;
  const maxNumberPage = props.valueMaxNumberPage;
  const size = props.valueSize;

  let ulPagesEl = "";
  if (maxNumberPage <= 3) {
    const arrPages = [];
    for (let i = 1; i <= maxNumberPage; i++) {
      arrPages.push(i);
    }
    ulPagesEl = arrPages.map((page) => {
      if (page === numberPage) {
        return (
          <li
            key={page}
            className="page-item  me-3 ms-3  active"
            style={{
              width: "50px",
            }}
          >
            <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
              {page}
            </button>
          </li>
        );
      } else {
        return (
          <li
            key={page}
            className="page-item  me-3 ms-3"
            style={{
              width: "50px",
            }}
          >
            <button
              className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
              onClick={() => {
                props.onChoosedNumberPage(page);
              }}
            >
              {page}
            </button>
          </li>
        );
      }
    });
  } else {
    if (numberPage === 1) {
      const arrPages = [numberPage, numberPage + 1];
      ulPagesEl = arrPages
        .map((page) => {
          if (page === numberPage) {
            return (
              <li
                key={page}
                className="page-item  me-3 ms-3  active"
                style={{
                  width: "50px",
                }}
              >
                <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
                  {page}
                </button>
              </li>
            );
          } else {
            return (
              <li
                key={page}
                className="page-item  me-3 ms-3"
                style={{
                  width: "50px",
                }}
              >
                <button
                  className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
                  onClick={() => {
                    props.onChoosedNumberPage(page);
                  }}
                >
                  {page}
                </button>
              </li>
            );
          }
        })
        .concat(
          <li
            key={numberPage + 2}
            className="page-item  me-3 ms-3 disabled"
            style={{
              width: "50px",
            }}
          >
            <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
              ...
            </button>
          </li>
        )
        .concat(
          <li
            key={maxNumberPage}
            className="page-item  me-3 ms-3"
            style={{
              width: "50px",
            }}
          >
            <button
              className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
              onClick={() => {
                props.onChoosedNumberPage(maxNumberPage);
              }}
            >
              {maxNumberPage}
            </button>
          </li>
        );
    } else if (numberPage === 2 && numberPage + 1 === maxNumberPage - 1) {
      const arrPages = [numberPage - 1, numberPage, numberPage + 1];
      ulPagesEl = arrPages
        .map((page) => {
          if (page === numberPage) {
            return (
              <li
                key={page}
                className="page-item  me-3 ms-3  active"
                style={{
                  width: "50px",
                }}
              >
                <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
                  {page}
                </button>
              </li>
            );
          } else {
            return (
              <li
                key={page}
                className="page-item  me-3 ms-3"
                style={{
                  width: "50px",
                }}
              >
                <button
                  className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
                  onClick={() => {
                    props.onChoosedNumberPage(page);
                  }}
                >
                  {page}
                </button>
              </li>
            );
          }
        })
        .concat(
          <li
            key={maxNumberPage}
            className="page-item  me-3 ms-3"
            style={{
              width: "50px",
            }}
          >
            <button
              className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
              onClick={() => {
                props.onChoosedNumberPage(maxNumberPage);
              }}
            >
              {maxNumberPage}
            </button>
          </li>
        );
    } else if (numberPage === 2 && numberPage + 1 !== maxNumberPage - 1) {
      const arrPages = [numberPage - 1, numberPage, numberPage + 1];
      ulPagesEl = arrPages
        .map((page) => {
          if (page === numberPage) {
            return (
              <li
                key={page}
                className="page-item  me-3 ms-3  active"
                style={{
                  width: "50px",
                }}
              >
                <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
                  {page}
                </button>
              </li>
            );
          } else {
            return (
              <li
                key={page}
                className="page-item  me-3 ms-3"
                style={{
                  width: "50px",
                }}
              >
                <button
                  className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
                  onClick={() => {
                    props.onChoosedNumberPage(page);
                  }}
                >
                  {page}
                </button>
              </li>
            );
          }
        })
        .concat(
          <li
            key={numberPage + 2}
            className="page-item  me-3 ms-3 disabled"
            style={{
              width: "50px",
            }}
          >
            <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
              ...
            </button>
          </li>
        )
        .concat(
          <li
            key={maxNumberPage}
            className="page-item  me-3 ms-3"
            style={{
              width: "50px",
            }}
          >
            <button
              className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
              onClick={() => {
                props.onChoosedNumberPage(maxNumberPage);
              }}
            >
              {maxNumberPage}
            </button>
          </li>
        );
    } else if (numberPage === 3 && numberPage + 1 === maxNumberPage) {
      const arrPages = [1, numberPage - 1, numberPage, numberPage + 1];
      ulPagesEl = arrPages.map((page) => {
        if (page === numberPage) {
          return (
            <li
              key={page}
              className="page-item  me-3 ms-3  active"
              style={{
                width: "50px",
              }}
            >
              <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
                {page}
              </button>
            </li>
          );
        } else {
          return (
            <li
              key={page}
              className="page-item  me-3 ms-3"
              style={{
                width: "50px",
              }}
            >
              <button
                className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
                onClick={() => {
                  props.onChoosedNumberPage(page);
                }}
              >
                {page}
              </button>
            </li>
          );
        }
      });
    } else if (numberPage === 3 && numberPage + 1 === maxNumberPage - 1) {
      const arrPages = [1, numberPage - 1, numberPage, numberPage + 1];
      ulPagesEl = arrPages
        .map((page) => {
          if (page === numberPage) {
            return (
              <li
                key={page}
                className="page-item  me-3 ms-3  active"
                style={{
                  width: "50px",
                }}
              >
                <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
                  {page}
                </button>
              </li>
            );
          } else {
            return (
              <li
                key={page}
                className="page-item  me-3 ms-3"
                style={{
                  width: "50px",
                }}
              >
                <button
                  className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
                  onClick={() => {
                    props.onChoosedNumberPage(page);
                  }}
                >
                  {page}
                </button>
              </li>
            );
          }
        })
        .concat(
          <li
            key={maxNumberPage}
            className="page-item  me-3 ms-3"
            style={{
              width: "50px",
            }}
          >
            <button
              className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
              onClick={() => {
                props.onChoosedNumberPage(maxNumberPage);
              }}
            >
              {maxNumberPage}
            </button>
          </li>
        );
    } else if (numberPage === 3 && numberPage + 1 !== maxNumberPage - 1) {
      const arrPages = [1, numberPage - 1, numberPage, numberPage + 1];
      ulPagesEl = arrPages
        .map((page) => {
          if (page === numberPage) {
            return (
              <li
                key={page}
                className="page-item  me-3 ms-3  active"
                style={{
                  width: "50px",
                }}
              >
                <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
                  {page}
                </button>
              </li>
            );
          } else {
            return (
              <li
                key={page}
                className="page-item  me-3 ms-3"
                style={{
                  width: "50px",
                }}
              >
                <button
                  className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
                  onClick={() => {
                    props.onChoosedNumberPage(page);
                  }}
                >
                  {page}
                </button>
              </li>
            );
          }
        })
        .concat(
          <li
            key={numberPage + 2}
            className="page-item  me-3 ms-3 disabled"
            style={{
              width: "50px",
            }}
          >
            <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
              ...
            </button>
          </li>
        )
        .concat(
          <li
            key={maxNumberPage}
            className="page-item  me-3 ms-3"
            style={{
              width: "50px",
            }}
          >
            <button
              className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
              onClick={() => {
                props.onChoosedNumberPage(maxNumberPage);
              }}
            >
              {maxNumberPage}
            </button>
          </li>
        );
    } else if (numberPage > 3 && numberPage < maxNumberPage - 2) {
      const arrPages = [numberPage - 1, numberPage, numberPage + 1];
      ulPagesEl = Array.of(
        <li
          key={1}
          className="page-item  me-3 ms-3"
          style={{
            width: "50px",
          }}
        >
          <button
            className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
            onClick={() => {
              props.onChoosedNumberPage(1);
            }}
          >
            1
          </button>
        </li>
      )
        .concat(
          <li
            key={numberPage - 2}
            className="page-item  me-3 ms-3 disabled"
            style={{
              width: "50px",
            }}
          >
            <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
              ...
            </button>
          </li>
        )
        .concat(
          arrPages.map((page) => {
            if (page === numberPage) {
              return (
                <li
                  key={page}
                  className="page-item  me-3 ms-3  active"
                  style={{
                    width: "50px",
                  }}
                >
                  <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
                    {page}
                  </button>
                </li>
              );
            } else {
              return (
                <li
                  key={page}
                  className="page-item  me-3 ms-3"
                  style={{
                    width: "50px",
                  }}
                >
                  <button
                    className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
                    onClick={() => {
                      props.onChoosedNumberPage(page);
                    }}
                  >
                    {page}
                  </button>
                </li>
              );
            }
          })
        )
        .concat(
          <li
            key={numberPage + 2}
            className="page-item  me-3 ms-3 disabled"
            style={{
              width: "50px",
            }}
          >
            <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
              ...
            </button>
          </li>
        )
        .concat(
          <li
            key={maxNumberPage}
            className="page-item  me-3 ms-3"
            style={{
              width: "50px",
            }}
          >
            <button
              className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
              onClick={() => {
                props.onChoosedNumberPage(maxNumberPage);
              }}
            >
              {maxNumberPage}
            </button>
          </li>
        );
    } else if (numberPage > 3 && numberPage + 1 === maxNumberPage - 1) {
      const arrPages = [numberPage - 1, numberPage, numberPage + 1];
      ulPagesEl = Array.of(
        <li
          key={1}
          className="page-item  me-3 ms-3"
          style={{
            width: "50px",
          }}
        >
          <button
            className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
            onClick={() => {
              props.onChoosedNumberPage(1);
            }}
          >
            1
          </button>
        </li>
      )
        .concat(
          <li
            key={numberPage - 2}
            className="page-item  me-3 ms-3 disabled"
            style={{
              width: "50px",
            }}
          >
            <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
              ...
            </button>
          </li>
        )
        .concat(
          arrPages.map((page) => {
            if (page === numberPage) {
              return (
                <li
                  key={page}
                  className="page-item  me-3 ms-3  active"
                  style={{
                    width: "50px",
                  }}
                >
                  <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
                    {page}
                  </button>
                </li>
              );
            } else {
              return (
                <li
                  key={page}
                  className="page-item  me-3 ms-3"
                  style={{
                    width: "50px",
                  }}
                >
                  <button
                    className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
                    onClick={() => {
                      props.onChoosedNumberPage(page);
                    }}
                  >
                    {page}
                  </button>
                </li>
              );
            }
          })
        )
        .concat(
          <li
            key={maxNumberPage}
            className="page-item  me-3 ms-3"
            style={{
              width: "50px",
            }}
          >
            <button
              className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
              onClick={() => {
                props.onChoosedNumberPage(maxNumberPage);
              }}
            >
              {maxNumberPage}
            </button>
          </li>
        );
    } else if (numberPage === maxNumberPage - 1) {
      const arrPages = [numberPage - 1, numberPage, numberPage + 1];
      ulPagesEl = Array.of(
        <li
          key={1}
          className="page-item  me-3 ms-3"
          style={{
            width: "50px",
          }}
        >
          <button
            className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
            onClick={() => {
              props.onChoosedNumberPage(1);
            }}
          >
            1
          </button>
        </li>
      )
        .concat(
          <li
            key={numberPage - 2}
            className="page-item  me-3 ms-3 disabled"
            style={{
              width: "50px",
            }}
          >
            <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
              ...
            </button>
          </li>
        )
        .concat(
          arrPages.map((page) => {
            if (page === numberPage) {
              return (
                <li
                  key={page}
                  className="page-item  me-3 ms-3  active"
                  style={{
                    width: "50px",
                  }}
                >
                  <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
                    {page}
                  </button>
                </li>
              );
            } else {
              return (
                <li
                  key={page}
                  className="page-item  me-3 ms-3"
                  style={{
                    width: "50px",
                  }}
                >
                  <button
                    className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
                    onClick={() => {
                      props.onChoosedNumberPage(page);
                    }}
                  >
                    {page}
                  </button>
                </li>
              );
            }
          })
        );
    } else if (numberPage === maxNumberPage) {
      const arrPages = [numberPage - 1, numberPage];
      ulPagesEl = Array.of(
        <li
          key={1}
          className="page-item  me-3 ms-3"
          style={{
            width: "50px",
          }}
        >
          <button
            className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
            onClick={() => {
              props.onChoosedNumberPage(1);
            }}
          >
            1
          </button>
        </li>
      )
        .concat(
          <li
            key={numberPage - 2}
            className="page-item  me-3 ms-3 disabled"
            style={{
              width: "50px",
            }}
          >
            <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
              ...
            </button>
          </li>
        )
        .concat(
          arrPages.map((page) => {
            if (page === numberPage) {
              return (
                <li
                  key={page}
                  className="page-item  me-3 ms-3  active"
                  style={{
                    width: "50px",
                  }}
                >
                  <button className="page-link h-100 w-100  d-flex justify-content-center align-items-center">
                    {page}
                  </button>
                </li>
              );
            } else {
              return (
                <li
                  key={page}
                  className="page-item  me-3 ms-3"
                  style={{
                    width: "50px",
                  }}
                >
                  <button
                    className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
                    onClick={() => {
                      props.onChoosedNumberPage(page);
                    }}
                  >
                    {page}
                  </button>
                </li>
              );
            }
          })
        );
    }
  }
 
  return (
    <div className="d-flex justify-content-center align-items-baseline">
      <nav className="mt-5 mb-5">
        <ul
          className="pagination justify-content-center"
          style={{
            height: "50px",
          }}
        >
          {numberPage > 1 && (
            <li
              className="page-item me-3 ms-3"
              style={{
                width: "50px",
              }}
            >
              <button
                className="page-link h-100 w-100 d-flex justify-content-center align-items-center"
                aria-label="Предыдущая"
                onClick={() => {
                  props.onChoosedNumberPage(numberPage - 1);
                }}
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
          )}
          {numberPage === 1 && (
            <li
              className="page-item me-3 ms-3 disabled"
              style={{
                width: "50px",
              }}
            >
              <button
                className="page-link h-100 w-100  d-flex justify-content-center align-items-center"
                aria-label="Предыдущая"
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
          )}
          {ulPagesEl}
          {numberPage < maxNumberPage && (
            <li
              className="page-item  me-3 ms-3"
              style={{
                width: "50px",
              }}
            >
              <button
                className="page-link h-100 w-100 d-flex justify-content-center align-items-center"
                aria-label="Следующая"
                onClick={() => {
                  props.onChoosedNumberPage(numberPage + 1);
                }}
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          )}
          {numberPage === maxNumberPage && (
            <li
              className="page-item  me-3 ms-3 disabled"
              style={{
                width: "50px",
              }}
            >
              <button
                className="page-link h-100 w-100 d-flex justify-content-center align-items-center"
                aria-label="Следующая"
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
      <select
        className="form-select form-select-sm w-auto"
        style={{ height: "50px" }}
        defaultValue={size}
        onChange={(event) => props.onChoosedSize(event.target.value)}
      >
        {PAGE_SIZE_VALUES.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default NewsPagination;
