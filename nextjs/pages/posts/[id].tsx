import { FC } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/layout/layout";
import Date from "../../components/date";
import { getPostData, getPostIds, Params, PostMeta } from "../../lib/posts";

import utilStyles from "../../styles/utils.module.scss";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};

const TestPost: FC<{ postData: PostMeta }> = ({ postData }) => (
  <Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <article>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: postData.htmlContent as string }}
      />
    </article>
  </Layout>
);

export default TestPost;
