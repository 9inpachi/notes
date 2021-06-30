import type { AppProps } from "next/app";
import { FC } from "react";
import "../styles/globals.scss";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
