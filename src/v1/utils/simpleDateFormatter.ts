export function formatDateToSimpleDate(input: Date) {
   const date = new Date(input);
   const year = date.getUTCFullYear();
   const month = String(date?.getUTCMonth() + 1).padStart(2, "0");
   const day = String(date?.getUTCDate()).padStart(2, "0");
   return `${year}-${month}-${day}`;
}
