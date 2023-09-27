import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { videoHandler } from '~/utils';
import { mainSlider20 } from '~/utils/data/carousel';
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
                      src={process.env.NEXT_PUBLIC_ASSET_URI + post.media}
                      alt="post image"
                      width={380}
                      height={230}
                      effect="opacity; transform"
                      style={{ backgroundColor: "#DEE6E8" }}
                    />
                      :
                      <LazyLoadImage
                        src={process.env.NEXT_PUBLIC_ASSET_URI + post.media}
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
                      src={process.env.NEXT_PUBLIC_ASSET_URI + post.media}
                      alt="post image"
                      width={300}
                      height={post.large_picture[0].height}
                    /> :

                      <img
                        src={process.env.NEXT_PUBLIC_ASSET_URI + post.media}
                        alt="post image"
                        width={300}
                        height={post.picture[0].height}
                      />
                  }
                </ALink>
            }
            {
              post.type === 'video' ?
                <>
                  <span className="video-play" onClick={videoHandler}></span>
                  <video width="380">
                    <source src={process.env.NEXT_PUBLIC_ASSET_URI + post.video.url} type="video/mp4" />
                  </video>
                </>
                : ''
            }
          </figure> :
          <figure className="post-media">
            {
              isLazy ?
                // <OwlCarousel adClass="owl-theme owl-dot-inner owl-dot-white gutter-no" options={mainSlider20}>
                //   {
                //     post.media.map((item, index) =>
                //       <LazyLoadImage
                //         src={process.env.NEXT_PUBLIC_ASSET_URI + item}
                //         alt="post gallery"
                //         key={item.title + '-' + index}
                //         width={380}
                //         height={230}
                //         effect="opacity; transform"
                //         style={{ backgroundColor: "#DEE6E8" }}
                //       />
                //     )}
                // </OwlCarousel>
                <LazyLoadImage
                  src={post.media}
                  alt="post gallery"
                  width={380}
                  height={230}
                  effect="opacity; transform"
                  style={{ backgroundColor: "#DEE6E8" }}
                />
                :
                // <OwlCarousel adClass="owl-theme owl-dot-inner owl-dot-white gutter-no" options={mainSlider20}>
                //   {
                //     post.media.map((item, index) =>
                //       <img
                //         src={process.env.NEXT_PUBLIC_ASSET_URI + item}
                //         alt="post gallery"
                //         key={item.title + '-' + index}
                //         width={item.width}
                //         height={item.height}
                //       />
                //     )}
                // </OwlCarousel>
                <img
                  src={post.media}
                  alt="post gallery"
                />
            }
          </figure>
      }

      <div className="post-details">
        <div className="post-meta">
          {
            isAuthor ? <>by <ALink href="#" className="post-author">{post.author}</ALink> on </> : ''
          }
          <ALink href="#" className="post-date">{getPostDate(post.createdAt)}</ALink>
        </div>
        <h4 className="post-title">
          <ALink href={`/blog/single/${post._id}`}>{post.title}</ALink>
        </h4>
        <ALink href={`/blog/single/${post._id}`} className={`btn btn-link btn-underline ${btnAdClass}`}>{btnText}<i className="d-icon-arrow-right"></i></ALink>
      </div>
    </div >
  )

}

export default PostSix;