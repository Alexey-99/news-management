import { LOCALE_EN, LOCALE_RU } from "../../../../../../locate/Locale";
import { CREATED_DATE, MODIFIED_DATE } from "../SortField";

const SortFieldSelect = (props) => {
  const userRole = props.valueUserRole;
  const locale = props.valueLocale;

  return (
    <select
      className="form-select h-100 w-auto"
      defaultValue={props.valueSortField}
      onChange={(event) => props.onChangeSortField(event.target.value)}
    >
      <option value={CREATED_DATE}>
        {(locale === LOCALE_RU && `Дата создания`) ||
          (locale === LOCALE_EN && `Date of creation`)}
      </option>
      <option value={MODIFIED_DATE}>
        {(locale === LOCALE_RU && `Дата изменнения`) ||
          (locale === LOCALE_EN && `Date of modification`)}
      </option>
    </select>
  );
};

export default SortFieldSelect;
