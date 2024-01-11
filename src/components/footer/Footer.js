const Footer = (props) => {
  return (
    <footer
      className="w-100 pt-4 pb-4 sticky-bottom"
      style={{
        backgroundColor: "#02214e",
      }}
    >
      <div className="container">
        <h4
          className="d-flex justify-content-center align-items-center text-center"
          style={{ color: "white" }}
        >
          <svg
            className="mt-1 me-1 bi bi-c-circle"
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="auto"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512Z" />
          </svg>
          2023 MJC School student. All rights reserved
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
