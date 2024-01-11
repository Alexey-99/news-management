import { PAGE_SIZE_VALUES } from "./PageSizeValues";

const TagsPagination = (props) => {
  const numberPage = props.valueNumberPage;
  const maxNumberPage = props.valueMaxNumberPage;
  const size = props.valueSize;

  const arrPages = [];
  for (let i = 1; i <= maxNumberPage; i++) {
    arrPages.push(i);
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
          {arrPages.map((page) => {
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
          })}
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

export default TagsPagination;
