import useSWR from "swr";
import { baseUrl, fetcher } from "./api";

const createRoom = (path: string) => {
  if (!path) {
    throw new Error("Path is required");
  }

  const url = baseUrl + path;

  const { data: posts, error } = useSWR(url, fetcher);
  console.log("front", error);

  return { posts, error };
};

export { createRoom };
