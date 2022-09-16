import { TResult } from "./types";

export const getResponse = (
  statusCode: number,
  body: { [key: string]: any }
): TResult => ({
  statusCode,
  body: JSON.stringify(body),
});
