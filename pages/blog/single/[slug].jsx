import Helmet from 'react-helmet';

import ALink from '~/components/features/custom-link';
import ErrorPage from '~/pages/pages/404';

import { getImgPath, videoHandler } from '~/utils';
import { getArticleById } from '~/utils/endpoints/articles';
import { getPostDate } from '~/utils';


PostSingle.getInitialProps = async (context) => {
  const post = await getArticleById(context.query.slug);
  return { post: post };
}

export default function PostSingle({ post }) {
  const loading = false;

  //if (error) return <ErrorPage />;

  return (
    <main className="main skeleton-body">
      <Helmet>
        <title>Mac Plus | {post.title}</title>
      </Helmet>

      <h1 className="d-none">Mac Plus - {post.title}</h1>

      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
            <li><ALink href="/blog" className="active">Блог</ALink></li>
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
                    </div>
                  </div >
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}