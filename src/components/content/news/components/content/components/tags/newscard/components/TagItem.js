const TagItem = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;
  const tag = props.valueTag;
  
  return (
    <div
      className="card border-primary mb-0 col"
      style={{ width: "auto", marginRight: "5px" }}
    >
      <div className="pt-2 text-primary">
        <h6
          className="card-title text-center text-uppercase"
          style={{ lineHeight: 1, fontWeight: 400 }}
        >
          {tag.name}
        </h6>
      </div>
    </div>
  );
};

export default TagItem;
