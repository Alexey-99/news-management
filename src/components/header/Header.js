import Logo from "./components/HeaderLogo.js";

const Header = (props) => {
  return (
    <header className="pt-4 pb-4" style={{ backgroundColor: "#02214e" }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ width: "50%" }}
          >
            <Logo />
            <h4
              className="text-uppercase ms-2 d-flex justify-content-start flex-column"
              style={{ color: "white" }}
            >
              home
            </h4>
            <h4
              className="text-uppercase ms-2 d-flex justify-content-start flex-column"
              style={{ color: "white" }}
            >
              news
            </h4>
            <h4
              className="text-uppercase ms-2 d-flex justify-content-start flex-column"
              style={{ color: "white" }}
            >
              about
            </h4>
          </div>
          <div>
            <h4
              className="text-uppercase ms-2 d-flex justify-content-start flex-column"
              style={{ color: "white" }}
            >
              sing out
            </h4>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
