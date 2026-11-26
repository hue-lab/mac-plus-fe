import { getImgPath, getPostDate, pageUrl } from '~/utils';
import { breadcrumbList, structuredData } from '~/utils/structured-data';
import ALink from '~/components/features/custom-link';
import React from 'react';
import Head from 'next/head';
import Image from "next/image";
import InlineSVG from "react-inlinesvg";
import {homeOutlineIcon} from "~/icons/home-outline";
import {chevronForwardOutlineIcon} from "~/icons/chevron-forward-outline";

export default function PostSingle({ post, description, faq, fullPath }) {
  const loading = false;
  const ogImage = post.media;
  const title = post.seo?.seoTitle?.trim() || post.title || 'Mac Plus';
  const author = post.seo?.seoAuthor?.trim();
  const publisher = { '@type': 'Organization', name: 'Mac Plus', url: pageUrl() };
  const article = {
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    ...(ogImage && { image: getImgPath(ogImage) }),
    ...(post.createdAt && { datePublished: post.createdAt }),
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    author: author ? { '@type': 'Person', name: author } : publisher,
    publisher,
    mainEntityOfPage: pageUrl(fullPath),
  };
  const breadcrumbs = breadcrumbList([['Главная', '/'], ['Блог', '/blog'], [post.title, fullPath]]);

  return (
    <main className="main skeleton-body">
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="keywords" content={post.seo?.seoKeywords?.join(', ')} />
        <meta name="author" content={post.seo?.seoAuthor || 'Mac Plus'} />
        {ogImage && <meta property="og:image" content={getImgPath(ogImage)} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData(article, breadcrumbs, faq) }} />
      </Head>

      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb breadcrumb-sm">
            <li>
              <ALink href="/">
                <InlineSVG className="icon-16" src={homeOutlineIcon}/>
              </ALink>
              <InlineSVG className="breadcrumb-arrow" src={chevronForwardOutlineIcon}/>
            </li>
            <li>
              <ALink href="/blog" className="active">
                Блог
              </ALink>
              <InlineSVG className="breadcrumb-arrow" src={chevronForwardOutlineIcon}/>
            </li>
            {post.title && <li itemProp="name">
              <span className="breadcrumb-latest">{post.title}</span>
            </li>}
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
                  {ogImage && <figure className="post-media">
                    <Image
                      className="post-cover"
                      priority
                      src={getImgPath(post.media)}
                      alt={post.seo?.seoImageAlt || post.title || ''}
                      title={post.seo?.seoTitle || post.title || ''}
                      width={1800}
                      height={1000}
                      sizes="(max-width: 991px) 100vw, 75vw"
                    />
                  </figure>}
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
