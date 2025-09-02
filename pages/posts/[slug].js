// pages/posts/[slug].js
import fs from "fs";
import path from "path";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Post({ post }) {
  const router = useRouter();

  // Show loading state if page is not yet generated
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Head>
        <title>{post.title} | FireClaimsFL</title>
        <meta name="description" content={post.excerpt || post.title} />
      </Head>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">{post.date}</p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

// Tell Next.js which paths to pre-render
export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDir);

  const paths = filenames.map((filename) => {
    const slug = filename.replace(/\.json$/, "");
    return { params: { slug } };
  });

  return {
    paths,
    fallback: true, // Generate pages on-demand if not built yet
  };
}

// Fetch post data based on slug
export async function getStaticProps({ params }) {
  const postsDir = path.join(process.cwd(), "posts");
  const filePath = path.join(postsDir, `${params.slug}.json`);

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const postData = fs.readFileSync(filePath, "utf8");
  const post = JSON.parse(postData);

  return {
    props: { post },
    revalidate: 60, // Optional: ISR, re-generate every 60 seconds
  };
}
