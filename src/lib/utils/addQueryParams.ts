export const addQueryParams = (
  pathname: string,
  queryParams: Record<string, string>
): string => {
  const searchParams = new URLSearchParams();
  for (const key in queryParams) {
    if (queryParams.hasOwnProperty(key)) {
      if (queryParams[key]) searchParams.append(key, queryParams[key]);
    }
  }
  return `${pathname}?${searchParams.toString()}`;
};
