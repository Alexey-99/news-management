const Logo = (props) => {
  return (
    <div className="d-flex align-items-center">
      <img
        className="bg-white"
        style={{ borderRadius: "20%" }}
        width="auto"
        height="65"
        src="https://img.icons8.com/carbon-copy/100/book-and-pencil.png"
        alt="book-and-pencil"
      />
      <h4
        className="text-uppercase ms-2 d-flex justify-content-start flex-column"
        style={{ color: "white" }}
      >
        <div>News </div>
        <div>management</div>
      </h4>
    </div>
  );
};

export default Logo;
