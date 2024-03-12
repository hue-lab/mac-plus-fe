import Helmet from "react-helmet";

import ALink from "~/components/features/custom-link";

import { getImgPath } from "~/utils";
import { getArticleBySlug } from "~/utils/endpoints/articles";
import { getFieldsObject } from "~/utils/endpoints/fields";
import { getPostDate } from "~/utils";
import React from "react";

PostSingle.getInitialProps = async (context) => {
  const post = await getArticleBySlug(context.query.slug);
  const seoFields = await getFieldsObject("blog-seo-title", "blog-seo-description");
  return { post: post, seoFields };
};

export default function PostSingle({ post, seoFields }) {
  const loading = false;
  const titleString = `${post.seo?.seoTitle || post.title || "Mac Plus"}`;
  const descriptionString = `${post.seo?.seoTitle || post.title || ""}`;

  return (
    <main className="main skeleton-body">
      <Helmet>
        <title>{seoFields["blog-seo-title"].replaceAll("{TITLE}", titleString)}</title>
        <meta
          name="description"
          content={seoFields["blog-seo-description"].replaceAll("{TITLE}", descriptionString)}
        />
        <meta name="keywords" content={post.seo?.seoKeywords?.join(", ")} />
        <meta name="author" content={post.seo?.seoAuthor || "Mac Plus"} />
      </Helmet>

      <h1 className="d-none">{post.title}</h1>

      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <ALink href="/">
                <i className="d-icon-home"></i>
              </ALink>
            </li>
            <li>
              <ALink href="/blog" className="active">
                Блог
              </ALink>
            </li>
            <li>{post.title}</li>
          </ul>
        </div>
      </nav>

      <div className="page-content with-sidebar">
        <div className="container">
          <div className="row gutter-lg">
            <div className="col-lg-9">
              {loading ? (
                <div className="skel-post"></div>
              ) : (
                <div className={`post post-single`}>
                  <figure className="post-media">
                    <img
                      src={getImgPath(post.media)}
                      alt={post.seo?.seoImageAlt || post.title || ""}
                      style={{
                        backgroundColor: "#DEE6E8",
                        width: 900,
                        height: 500,
                        objectFit: "cover",
                      }}
                    />
                  </figure>
                  <div className="post-details">
                    <div className="post-meta">
                      <ALink href="#" className="post-date">
                        {getPostDate(post.createdAt)}
                      </ALink>
                    </div>
                    <h4 className="post-title">
                      <ALink href="#">{post.title}</ALink>
                    </h4>
                    <div
                      className="post-body mb-7"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
