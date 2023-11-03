import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';
import { getImgPath } from '~/utils';
import { getPostDate } from '~/utils';

function PostSix(props) {
  const { post, adClass = 'post-sm', isLazy = false, isOriginal = false, btnText = "Подробнее", btnAdClass = 'btn-dark btn-md', isAuthor = true } = props;

  return (
    <div className={`post ${post.type === 'gallery' ? '' : 'overlay-zoom'} ${post.type === 'video' ? 'post-video' : ''} ${adClass}`}>
      {
        post.type === 'image' || post.type === 'video' ?
          <figure className="post-media">
            {
              isLazy ?
                <ALink href={`/blog/single/${post._id}`}>
                  {
                    isOriginal ? <LazyLoadImage
                      src={getImgPath(post.media)}
                      alt="post image"
                      width={380}
                      height={230}
                      effect="opacity; transform"
                      style={{ backgroundColor: "#DEE6E8" }}
                    />
                      :
                      <LazyLoadImage
                        src={getImgPath(post.media)}
                        alt="post image"
                        width={380}
                        height={230}
                        effect="opacity; transform"
                        style={{ backgroundColor: "#DEE6E8" }}
                      />
                  }
                </ALink>
                :
                <ALink href={`/blog/single/${post._id}`}>
                  {
                    isOriginal ? <img
                      src={getImgPath(post.media)}
                      alt="post image"
                      width={300}
                      height={post.large_picture[0].height}
                    /> :

                      <img
                        src={getImgPath(post.media)}
                        alt="post image"
                        width={300}
                        height={post.picture[0].height}
                      />
                  }
                </ALink>
            }
          </figure> :
          <figure className="post-media">
            {
              isLazy ?
                <ALink href={`/blog/single/${post._id}`}>
                  <LazyLoadImage
                    src={getImgPath(post.media)}
                    alt="post gallery"
                    width={380}
                    height={230}
                    effect="opacity; transform"
                    style={{ backgroundColor: "#DEE6E8" }}
                  />
                </ALink>
                :
                <ALink href={`/blog/single/${post._id}`}>
                  <img
                    src={getImgPath(post.media)}
                    alt="post gallery"
                    width={380}
                    height={230}
                  />
                </ALink>
            }
          </figure>
      }

      <div className="post-details">
        <div className="post-meta">
          <ALink href={`/blog/single/${post._id}`} className="post-date">{getPostDate(post.createdAt)}</ALink>
        </div>
        <h4 className="post-title">
          <ALink href={`/blog/single/${post._id}`}>{post.title}</ALink>
        </h4>
      </div>
    </div >
  )

}

export default PostSix;