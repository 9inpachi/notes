/** Event with sls offline server. */
export type TEvent = {
  body: string;
  queryStringParameters: {
    someParameter?: string;
  };
};

export type TResult = {
  statusCode: number;
  headers?: string[];
  body: string;
};

export type TInput = {
  imageUrl: string;
  message: string;
};
