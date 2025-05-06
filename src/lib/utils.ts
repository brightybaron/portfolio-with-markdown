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
