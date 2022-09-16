import { Handler } from "aws-lambda";
import { getResponse } from "./functions";
import { TInput, TResult } from "./types";

export const processImage: Handler<TInput, TResult> = (
  event,
  _context,
  _callback
) => {
  const response = getResponse(200, {
    newImageUrl: event.imageUrl,
    message: `Successfully processed request with message: ${event.message}`,
  });

  return new Promise<TResult>((resolve) => {
    resolve(response);
  });
};
