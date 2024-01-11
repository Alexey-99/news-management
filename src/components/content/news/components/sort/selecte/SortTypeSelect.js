import { LOCALE_EN, LOCALE_RU } from "../../../../../../locate/Locale";
import { ASC, DESC } from "../SortType";

const SortTypeSelect = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;

  return (
    <select
      className="form-select h-100 me-3"
      defaultValue={props.valueSortType}
      onChange={(event) => props.onChangeSortType(event.target.value)}
    >
      <option value={ASC}>
        {(locale === LOCALE_RU && `По возростанию`) ||
          (locale === LOCALE_EN && `Ascending`)}
      </option>
      <option value={DESC}>
        {(locale === LOCALE_RU && `По убыванию`) ||
          (locale === LOCALE_EN && `Descending`)}
      </option>
    </select>
  );
};

export default SortTypeSelect;
