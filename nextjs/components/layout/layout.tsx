import { FC } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "./layout.module.scss";
import utilStyles from "../../styles/utils.module.scss";

export const siteTitle = "Kono Dio da!";
export const name = "Dio Brando";

interface Props {
  home?: boolean;
}

export const Layout: FC<Props> = ({ home, children }) => (
  <div className={styles.container}>
    <Head>
      <title>Dio Blog</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="Kono dio da!" />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURI(
          siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>

    <header className={styles.header}>
      {home ? (
        <>
          <Image
            src="/images/dio.jpg"
            width={144}
            height={144}
            alt="Kono dio da!"
            className={utilStyles.borderCircle}
          />
          <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </>
      ) : (
        <>
          <Link href="/">
            <a>
              <Image
                src="/images/dio.jpg"
                width={108}
                height={108}
                alt="Kono dio da!"
                className={utilStyles.borderCircle}
              />
            </a>
          </Link>
          <h2 className={utilStyles.headingLg}>
            <Link href="/">
              <a className={utilStyles.colorInherit}>{name}</a>
            </Link>
          </h2>
        </>
      )}
    </header>

    <main>{children}</main>

    {!home && (
      <div className={styles.backToHome}>
        <Link href="/">
          <a>&larr; Back to home</a>
        </Link>
      </div>
    )}
  </div>
);

export default Layout;
