/**
 * Takes in a date string such as "2023-03-21T13:30:00.000Z" and returns a
 * formatted date in MM/DD/YYYY.
 * @param dateString
 * @returns
 */
const formatDate = (dateString?: string) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export default formatDate;
