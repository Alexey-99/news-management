import { Accordion } from "react-bootstrap";
import {
  ROLE_ADMIN,
  ROLE_USER,
} from "../../../../../../../../../role/UserRole";
import TagForAddToNewsItem from "./compontents/TagsForAddToNewsItem";
import { LOCALE_EN, LOCALE_RU } from "../../../../../../../../../locate/Locale";

const AccordionAllTagsForAddToNews = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {(locale === LOCALE_EN && `Show all tags`) ||
            (locale === LOCALE_RU && `Показать все теги`)}
        </Accordion.Header>
        <Accordion.Body>
          <table className="table table-success table-striped table-hover">
            <thead>
              <tr>
                <th scope="col" style={{ width: "80%" }}>
                  {(locale === LOCALE_EN && `tag name`) ||
                    (locale === LOCALE_RU && `название тега`)}
                </th>
                {(userRole === ROLE_USER || userRole === ROLE_ADMIN) && (
                  <th className="text-center" scope="col">
                    {(locale === LOCALE_RU && `добавить в новость`) ||
                      (locale === LOCALE_EN && `add to news`)}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {props.valueAllTags.map((tag) => {
                const tagItem = tag.tag;
                const isHaveTagInNews =
                  props.valueNewsTags.filter((newsTag) => {
                    return newsTag.id === tagItem.id;
                  }).length > 0;
                return (
                  <TagForAddToNewsItem
                    key={tagItem.id}
                    valueTag={tagItem}
                    valueUserRole={userRole}
                    valueLocale={locale}
                    valueNewsId={props.valueNewsId}
                    onAddTagToNews={(tagItem) => props.onAddTag(tagItem)}
                    valueIsHaveTagInNews={isHaveTagInNews}
                    onChangedNews={() => props.onChangedNews()}
                    onChangeUserRole={(userRole) =>
                      props.onChangeUserRole(userRole)
                    }
                  />
                );
              })}
            </tbody>
          </table>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AccordionAllTagsForAddToNews;
