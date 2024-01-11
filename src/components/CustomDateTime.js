const CustomDateTime = (props) => {
  const locale = props.valueLocale;

  const dateTime = props.valueDateTime.split("T");
  const date = dateTime[0];
  const time = dateTime[1];
  const yearMonthDay = date.split("-");
  const year = yearMonthDay[0];
  const month = yearMonthDay[1];
  const day = yearMonthDay[2];
  const hms = time.split(":");
  const hours = hms[0];
  const minuts = hms[1];
  const secMs = hms[2].split(".");
  const seconds = secMs[0];
  const miliSeconds = secMs[1];
  const dateModified = new Date(
    year,
    month - 1,
    day,
    hours,
    minuts,
    seconds,
    miliSeconds
  );

  return (
    <>
      {dateModified.toLocaleString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
        timezone: "UTC",
        hour: "numeric",
        minute: "numeric",
      })}
    </>
  );
};

export default CustomDateTime;
