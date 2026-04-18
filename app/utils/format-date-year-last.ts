export function formatDateYearLast(value: number) {
  const newDate = new Date(value).toISOString().split("T")[0];
  const [year, month, day] = newDate?.split("-") as string[];
  return `${month}-${day}-${year}`;
}
