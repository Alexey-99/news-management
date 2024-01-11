import NewsCard from "./components/NewsCard";

const NewsList = (props) => {
  const userRole = props.valueUserRole;
  const newsList = props.valueNewsList;
  const locale = props.valueLocale;

  return (
    <div className="pt-4">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {newsList.map((news) => (
          <NewsCard
            onChangeNews={() => props.onChangeNews()}
            key={news.id}
            valueNews={news}
            valueLocale={locale}
            valueUserRole={userRole}
            onChangeUserRole={(userRole) => props.onChangeUserRole(userRole)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
