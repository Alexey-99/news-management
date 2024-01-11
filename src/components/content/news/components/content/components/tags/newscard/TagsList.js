import { useState } from "react";
import { getAllTagsByNewsIdQuery } from "../../../../../../../../query/Tag";
import TagItem from "./components/TagItem";
import { LOCALE_EN, LOCALE_RU } from "../../../../../../../../locate/Locale";

const TagsList = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;

  const newsId = props.valueNewsId;
  const newsCountTags = props.valueCountTags;

  const tags = props.havingNewsTags;

  return (
    <div>
      {tags.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-between ms-0">
          {tags.map((tag) => (
            <TagItem
              key={tag.id}
              valueTag={tag}
              valueLocale={locale}
              valueUserRole={userRole}
            />
          ))}
        </div>
      )}
      {tags.length === 0 && (
        <p>
          {(locale === LOCALE_RU && `У новости нет тегов`) ||
            (locale === LOCALE_EN && `The news does not have tags`)}
        </p>
      )}
    </div>
  );
};

export default TagsList;
