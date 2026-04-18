export function formatDate(value: number) {
  return new Date(value).toISOString().split("T")[0];
}
