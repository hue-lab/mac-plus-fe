import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { videoHandler, getPostDate, getImgPath } from '~/utils';
import { mainSlider20 } from '~/utils/data/carousel';
import Image from "next/image";

function PostOne(props) {
  const { post, adClass = 'mb-7', isLazy = false, isOriginal = false, btnText = 'Подробнее', btnAdClass = '', isButton = true } = props;
  return (
    <div className={`post post-classic ${post.type === 'video' ? 'post-video' : ''} ${adClass}`}>
      <figure style={{ borderRadius: '2rem', overflow: 'hidden' }} className={`post-media ${post.type === 'image' ? 'overlay-zoom' : ''}`}>
        {isLazy ? (
          <ALink href={`/blog/${post.seo?.seoUrl || '#'}`}>
            <Image priority src={getImgPath(post.media)} alt={post.seo?.seoImageAlt || post.title || ''} title={post.seo?.seoTitle || post.title || ''} style={{ backgroundColor: '#DEE6E8' }} className="post-cover-img" />
          </ALink>
        ) : (
          <ALink href={`/blog/${post.seo?.seoUrl || '#'}`}>
            <Image priority src={getImgPath(post.media)} alt={post.seo?.seoImageAlt || post.title || ''} title={post.seo?.seoTitle || post.title || ''} style={{ backgroundColor: '#DEE6E8' }} className="post-cover-img" />
          </ALink>
        )}
      </figure>

      <div className="post-details">
        <div className="post-meta">
          <ALink href="#" className="post-date">
            {getPostDate(post.createdAt)}
          </ALink>
        </div>
        <h4 className="post-title">
          <ALink href={`/blog/${post.seo?.seoUrl || '#'}`}>{post.title}</ALink>
        </h4>
        <p className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></p>
        {isButton ? (
          <ALink href={`/blog/${post.seo?.seoUrl || '#'}`} className={`btn btn-link btn-underline btn-primary ${btnAdClass}`}>
            {btnText}
            <i className="d-icon-arrow-right"></i>
          </ALink>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default PostOne;
