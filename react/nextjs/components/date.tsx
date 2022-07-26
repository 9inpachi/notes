import { format, parseISO } from "date-fns";
import { FC } from "react";

type Props = {
  dateString: string;
};

export const Date: FC<Props> = ({ dateString }) => {
  const parsedDate = parseISO(dateString);
  return <time dateTime={dateString}>{format(parsedDate, "d LLLL, yyyy")}</time>;
};

export default Date;
