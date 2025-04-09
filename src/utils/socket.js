import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL); // Socket connection url for local
  } else {
    return io("/", { path: "/api/socket.io" }); // Socket connection url for production
  }
};
