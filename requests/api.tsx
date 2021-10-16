export const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const baseUrl = "http://localhost:8000/api/v1";
