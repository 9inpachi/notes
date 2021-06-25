import path from "path";
import fs from "fs";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "posts");

export type PostMeta = {
  id: string;
  title: string;
  date: string;
  content: string;
  htmlContent?: string;
};

export const getSortedPostsData = () => {
  const allPosts = fs.readdirSync(postsDir);
  const allPostsData = allPosts.map((postFile): PostMeta => {
    const postId = postFile.replace(/\.md$/, "");

    const fullPath = path.join(postsDir, postFile);
    const postContent = fs.readFileSync(fullPath, "utf-8");

    const parsedPost = matter(postContent);

    return {
      id: postId,
      ...(parsedPost.data as Omit<PostMeta, "id" | "htmlContent">),
    };
  });

  return allPostsData.sort(({ date: dateA }, { date: dateB }) => {
    if (dateA < dateB) {
      return 1;
    } else if (dateA > dateB) {
      return -1;
    } else {
      return 0;
    }
  });
};

export type Params = {
  params: {
    id: string;
  };
};

export const getPostIds = (): Params[] => {
  const allPosts = fs.readdirSync(postsDir);
  return allPosts.map((postFile) => ({
    params: {
      id: postFile.replace(/\.md/, ""),
    },
  }));
};

export const getPostData = async (id: string) => {
  const postFilePath = path.join(postsDir, `${id}.md`);
  const postData = fs.readFileSync(postFilePath, "utf-8");

  const parsedPost = matter(postData);

  const processedContent = await remark().use(html).process(parsedPost.content);

  return {
    id,
    htmlContent: processedContent.toString(),
    ...(parsedPost.data as Omit<PostMeta, "id" | "htmlContent">),
  };
};
