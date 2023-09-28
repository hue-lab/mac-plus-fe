import { useQuery } from '@apollo/react-hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Helmet from 'react-helmet';

import withApollo from '~/server/apollo';
import { GET_POST } from '~/server/queries';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import ErrorPage from '~/pages/pages/404';

import BlogSidebar from '~/components/partials/post/blog-sidebar';
import RelatedPosts from '~/components/partials/post/related-posts';

import { mainSlider20 } from '~/utils/data/carousel';
import {getImgPath, videoHandler} from '~/utils';
import { getArticleById } from '~/utils/endpoints/articles';
import { getPostDate } from '~/utils';


PostSingle.getInitialProps = async (context) => {
  const post = await getArticleById(context.query.slug);
  return { post: post };
}

export default function PostSingle({ post }) {
  const loading = false;

  //if (!slug) return ''; '6514754361d75bc4c3589d75'


  //if (error) return <ErrorPage />;

  return (
    <main className="main skeleton-body">
      <Helmet>
        <title>Mac Plus | Новости</title>
      </Helmet>

      <h1 className="d-none">Mac Plus - Новости</h1>

      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
            <li><ALink href="/blog/classic" className="active">Блог</ALink></li>
            <li>{post.title}</li>
          </ul>
        </div>
      </nav>

      <div className="page-content with-sidebar">
        <div className="container">
          <div className="row gutter-lg">
            <div className="col-lg-9">
              {
                loading ?
                  <div className="skel-post"></div>
                  :
                  <div className={`post post-single`}>
                    <figure className="post-media">
                      <img
                        src={getImgPath(post.media)}
                        alt="post gallery"
                        style={{ backgroundColor: "#DEE6E8", width: 900, height: 500, objectFit: "cover" }}
                      />
                    </figure>
                    <div className="post-details">
                      <div className="post-meta">
                        <ALink href="#" className="post-date">{getPostDate(post.createdAt)}</ALink>
                      </div>
                      <h4 className="post-title">
                        <ALink href="#">{post.title}</ALink>
                      </h4>
                      <div className="post-body mb-7" dangerouslySetInnerHTML={{ __html: post.content }}>

                      </div>

                      <div className="post-footer mt-7 mb-3">

                        <div className="social-icons">
                          <ALink href="#" className="social-icon social-facebook" title="Facebook"><i className="fab fa-facebook-f"></i></ALink>
                          <ALink href="#" className="social-icon social-twitter" title="Twitter"><i className="fab fa-twitter"></i></ALink>
                          <ALink href="#" className="social-icon social-pinterest" title="Pinterest"><i className="fab fa-pinterest-p"></i></ALink>
                        </div>
                      </div>
                    </div>
                  </div >
              }
              {/* {
                loading ? '' :
                  <nav className="page-nav">
                    <ALink className="pager-link pager-link-prev" href={`/blog/single/${related[0].slug}`}>
                      Previous Post
                      <span className="pager-link-title">{related[0].title}</span>
                    </ALink>
                    <ALink className="pager-link pager-link-next" href={`/blog/single/${related[related.length - 1].slug}`}>
                      Go To Post
                      <span className="pager-link-title">{related[related.length - 1].title}</span>
                    </ALink>
                  </nav>
              } */}

              {/* <RelatedPosts posts={related} loading={loading} /> */}

              {/* {
                loading ? '' :
                  <div className="comments">
                    <h3 className="title title-simple text-left text-normal font-weight-bold">{post.comments} Comments</h3>

                    {
                      post.comments > 0 ? '' :
                        <h3 className="title title-simple text-left text-normal font-weight-normal" style={{ fontSize: "1.8rem" }}>
                          {
                            "Be The First To Review “" + post.title + "”"
                          }
                        </h3>
                    }
                    <ul>
                      {
                        post.comments > 0 ?
                          <li>
                            <div className="comment">
                              <figure className="comment-media">
                                <ALink href="#">
                                  <img src="./images/blog/comments/1.jpg" alt="avatar" width="60" height="60" />
                                </ALink>
                              </figure>
                              <div className="comment-body">
                                <div className="comment-user">
                                  <span className="comment-date">November 9, 2018 at 2:19 pm</span>
                                  <h4><ALink href="#">Jimmy Pearson</ALink></h4>
                                </div>

                                <div className="comment-content mb-2">
                                  <p>Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. </p>
                                </div>
                                <ALink href="#" className="btn btn-link btn-reveal-right">REPLY<i className="d-icon-arrow-right"></i></ALink>
                              </div>
                            </div>
                            {
                              post.comments > 1 ?
                                <ul>
                                  <li>
                                    <div className="comment">
                                      <figure className="comment-media">
                                        <ALink href="#">
                                          <img src="./images/blog/comments/2.jpg" alt="avatar" width="60" height="60" />
                                        </ALink>
                                      </figure>

                                      <div className="comment-body">
                                        <div className="comment-user">
                                          <span className="comment-date">November 9, 2018 at 2:19 pm</span>
                                          <h4><ALink href="#">Lena Knight</ALink></h4>
                                        </div>

                                        <div className="comment-content mb-2">
                                          <p>Morbi interdum mollis sapien. Sed ac risus.</p>
                                        </div>
                                        <ALink href="#" className="btn btn-link btn-reveal-right">REPLY<i className="d-icon-arrow-right"></i></ALink>
                                      </div>
                                    </div>
                                  </li></ul> : ''
                            }
                          </li>
                          : ''
                      }
                      {
                        post.comments > 2 ?
                          <li>
                            <div className="comment">
                              <figure className="comment-media">
                                <ALink href="#">
                                  <img src="./images/blog/comments/1.jpg" alt="avatar" width="60" height="60" />
                                </ALink>
                              </figure>

                              <div className="comment-body">
                                <div className="comment-user">
                                  <span className="comment-date">November 9, 2018 at 2:19 pm</span>
                                  <h4><ALink href="#">Johnathan Castillo</ALink></h4>
                                </div>

                                <div className="comment-content mb-2">
                                  <p>Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>
                                </div>
                                <ALink href="#" className="btn btn-link btn-reveal-right">REPLY<i className="d-icon-arrow-right"></i></ALink>
                              </div>
                            </div>
                          </li> : ''
                      }
                    </ul>
                  </div>
              } */}

              <div className="reply">
                <div className="title-wrapper text-left">
                  <h3 className="title title-simple text-left text-normal">Leave A Reply</h3>
                  <p>Your email address will not be published. Required fields are marked *</p>
                </div>
                <form action="#">
                  <textarea id="reply-message" cols="30" rows="6" className="form-control mb-4" placeholder="Comment *" required></textarea>
                  <div className="row">
                    <div className="col-md-6 mb-5">
                      <input type="text" className="form-control" id="reply-name" name="reply-name" placeholder="Name *" required />
                    </div>
                    <div className="col-md-6 mb-5">
                      <input type="email" className="form-control" id="reply-email" name="reply-email" placeholder="Email *" required />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-rounded">POST COMMENT<i className="d-icon-arrow-right"></i></button>
                </form>
              </div>

            </div>

            {/* <BlogSidebar /> */}
          </div>
        </div>
      </div>
    </main>
  )
}

// export default withApollo({ ssr: typeof window === 'undefined' })(PostSingle);