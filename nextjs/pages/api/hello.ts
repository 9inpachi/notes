import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const name = (req.query.name as string) ?? req.body.name ?? "Kono Dio Da";
  res.status(200).json({ name });
};

export default handler;
