import { FC } from "react";

interface Props {
  title: string;
}

export const Card: FC<Props> = ({ title, children }) => (
  <div>
    <h2>{title}</h2>
    {children}
  </div>
);
