import { FC } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../components/layout/layout";
import { getSortedPostsData, PostMeta } from "../lib/posts";
import Date from "../components/date";

import utilStyles from "../styles/utils.module.scss";

// Processes and fetches data at "build" time. We get the "built" version in bundle.
export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getSortedPostsData();
  return {
    props: {
      allPosts,
    },
  };
};

// Processes and fetches data at "runtime"/"request time" for each request separately. Function is called everytime in production.
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // ... Some database operations etc.
//   const allPosts = getSortedPostsData();
//   return {
//     props: {
//       allPosts,
//     },
//   };
// };

export const Home: FC<{ allPosts: PostMeta[] }> = ({ allPosts }) => {
  return (
    <Layout home>
      <section className={utilStyles.headingMd}>
        <p>
          You thought it was a test website, but it was me, <b>Dio</b>!
        </p>
        <p>
          Dio Brando is a fictional character appearing in JoJo's Bizarre
          Adventure, a Japanese manga series written and illustrated by Hirohiko
          Araki. He is the main antagonist of the series' first part, Phantom
          Blood, appearing in the debut chapter "Dio the Invader"
        </p>
      </section>
      <section
        className={[utilStyles.headingMd, utilStyles.padding1px].join(" ")}
      >
        <h2 className={utilStyles.headingLg}>Blog Posts</h2>
        <ul className={utilStyles.list}>
          {allPosts.map(({ id, title, date }) => (
            <li key={id} className={utilStyles.listItem}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;
