import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { videoHandler, getPostDate, getImgPath } from '~/utils';
import { mainSlider20 } from '~/utils/data/carousel';

function PostOne(props) {
  const { post, adClass = 'mb-7', isLazy = false, isOriginal = false, btnText = "Подробнее", btnAdClass = '', isButton = true } = props;
  return (
    <div className={`post post-classic ${post.type === 'video' ? 'post-video' : ''} ${adClass}`}>
      <figure className={`post-media ${post.type === 'image' ? 'overlay-zoom' : ''}`}>
        {
          isLazy ?
            <ALink href={`/blog/single/${post._id}`}>
              <LazyLoadImage
                src={getImgPath(post.media)}
                alt="post image"
                effect="opacity; transform"
                style={{ backgroundColor: "#DEE6E8" }}
              />
            </ALink>
            :
            <ALink href={`/blog/single/${post._id}`}>
              <img
                src={getImgPath(post.media)}
                alt="post image"
              />
            </ALink>
        }
      </figure>


      <div className="post-details">
        <div className="post-meta">
          <ALink href='#' className="post-date">{getPostDate(post.createdAt)}</ALink>
        </div>
        <h4 className="post-title">
          <ALink href={`/blog/single/${post._id}`}>{post.title}</ALink>
        </h4>
        <p className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></p>
        {
          isButton ?
            <ALink href={`/blog/single/${post._id}`} className={`btn btn-link btn-underline btn-primary ${btnAdClass}`}>{btnText}<i className="d-icon-arrow-right"></i></ALink>
            : ''
        }
      </div>
    </div >
  )
}

export default PostOne;