import { MESSAGE_CLOSE, MESSAGE_OPEN } from "./types";

export const openMessage = (open: boolean) => { 
  if (open) {
    return { type: MESSAGE_OPEN };
  } else return { type: MESSAGE_CLOSE };
};


export type messageAction = 
  | ReturnType<typeof openMessage>