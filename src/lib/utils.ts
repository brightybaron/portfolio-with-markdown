export const formatDate = (dateStr: string, path?: string) => {
  const date = new Date(dateStr);

  const isPath =
    path?.includes("/posts") ||
    path?.includes("/projects") ||
    path?.includes("/photos");

  const formatter = new Intl.DateTimeFormat("en-ID", {
    dateStyle: isPath ? "long" : "medium",
    timeStyle: path === "/dashboard" ? "short" : undefined,
  });

  return formatter.format(date);
};

/**
 * Format an Indonesian phone number:
 * - Replaces the country code "62" with "0"
 * - Groups digits in sets of 4, separated by spaces
 *
 * Example:
 *   Input: 6285226822944
 *   Output: "0852 2682 2944"
 */

export const formatPhoneNumber = (input: string | number): string => {
  let str = input.toString();

  if (str.startsWith("62")) {
    str = "0" + str.slice(2);
  }

  const chunks = str.match(/.{1,4}/g);
  return chunks ? chunks.join(" ") : str;
};
