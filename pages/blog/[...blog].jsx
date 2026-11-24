import {getArticleBySlug, getArticles} from "~/utils/endpoints/articles";
import {htmlText, prepareSeoContent} from "~/utils/seo-content";
import {isTemporaryApiError} from "~/utils/endpoints/fetch-json";
import {pagePath} from "~/utils";
import {useEffect} from "react";
import PostSingle from "~/components/items/post-single";
import PostList from "~/components/items/post-list";

export async function getServerSideProps({params, resolvedUrl, req, res}) {
  if (params.blog.length !== 1) return {notFound: true};
  const [slug] = params.blog;
  const fullPath = pagePath('blog', slug);
  const url = new URL(req.headers['x-nextjs-data'] ? resolvedUrl : req.url, 'http://localhost');
  const redirect = () => decodeURI(url.pathname) === fullPath ? null : {
    redirect: {destination: encodeURI(fullPath) + url.search, permanent: true},
  };

  try {
    if (/^page-is-[1-9]\d*$/.test(slug)) {
      const posts = await getArticles(Number(slug.slice('page-is-'.length)), 8);
      if (!posts?.data?.length) return {notFound: true};
      return redirect() || {props: {type: 'posts', posts, fullPath}};
    }
    const post = await getArticleBySlug(slug);
    if (!post || post.statusCode === 404 || post.hidden) return {notFound: true};
    const {html, faq} = prepareSeoContent(post.content || '');
    const description = post.seo?.seoDescription?.trim() || htmlText(post.description) || post.title || 'Mac Plus';
    return redirect() || {
      props: {type: 'post', post: {...post, content: html}, fullPath, description, faq},
    };
  } catch (error) {
    if (!isTemporaryApiError(error)) throw error;
    res.statusCode = 503;
    return {props: {serviceUnavailable: true, retryUrl: resolvedUrl}};
  }
}

export default function GenericBlog({type, post, posts, description, faq, fullPath}) {
  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, [fullPath]);

  return type === 'post'
    ? <PostSingle post={post} description={description} faq={faq} fullPath={fullPath}/>
    : <PostList fullPath={fullPath} posts={posts}/>;
}
