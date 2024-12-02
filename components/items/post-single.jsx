import { getImgPath, getPostDate } from '~/utils';
import ALink from '~/components/features/custom-link';
import React from 'react';
import Head from 'next/head';
import Image from "next/image";

export default function PostSingle({ post, seoFields }) {
  const loading = false;
  const ogImage = post.media;
  const titleString = `${post.seo?.seoTitle || post.title || 'Mac Plus'}`;
  const descriptionString = `${post.seo?.seoTitle || post.title || ''}`;

  const interpolatedTitle = seoFields['blog-seo-title'].replaceAll('{TITLE}', titleString);
  const interpolatedDescription = seoFields['blog-seo-description'].replaceAll('{TITLE}', descriptionString);

  return (
    <main className="main skeleton-body">
      <Head>
        <title>{interpolatedTitle}</title>
        <meta property="og:title" content={interpolatedTitle} />
        <meta name="description" content={interpolatedDescription} />
        <meta property="og:description" content={interpolatedDescription} />
        <meta name="keywords" content={post.seo?.seoKeywords?.join(', ')} />
        <meta name="author" content={post.seo?.seoAuthor || 'Mac Plus'} />
        {ogImage && <meta property="og:image" content={getImgPath(ogImage)} />}
      </Head>

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
                    <Image
                      src={getImgPath(post.media)}
                      alt={post.seo?.seoImageAlt || post.title || ''}
                      title={post.seo?.seoTitle || post.title || ''}
                      width={900}
                      height={500}
                      style={{
                        backgroundColor: '#DEE6E8',
                        width: 900,
                        height: 500,
                        objectFit: 'cover',
                      }}
                    />
                  </figure>
                  <div className="post-details">
                    <div className="post-meta">
                      <ALink href="#" className="post-date">
                        {getPostDate(post.createdAt)}
                      </ALink>
                    </div>
                    <h1 className="post-title">{post.title}</h1>
                    <div className="post-body mb-7" dangerouslySetInnerHTML={{ __html: post.content }}></div>
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
