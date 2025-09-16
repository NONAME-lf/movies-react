export async function delay(ms) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatDate(date = "") {
  if (/\d\d\d\d-\d\d-\d\d/.test(date) === false) return "-- --- ----";
  const arDate = date.split("-");
  const arMonth = [
    "Nul",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${arDate[2]} ${arMonth[parseInt(arDate[1])]} ${arDate[0]}`;
}
