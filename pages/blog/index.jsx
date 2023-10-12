import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';
import Pagination from '~/components/features/pagination';

import PostOne from '~/components/features/post/post-one';

import { getArticles } from '~/utils/endpoints/articles';

Classic.getInitialProps = async (context) => {
  const posts = await getArticles();
  return {
    posts: posts,
  }
}

export default function Classic(posts) {
  const router = useRouter();
  const query = router.query;
  const showingCount = 8;
  const loading = false;
  const [perPage, setPerPage] = useState(showingCount);
  const totalPage = posts.posts.metadata.lastPage;

  console.log(query);

  return (
    <main className="main skeleton-body">
      <Helmet>
        <title>Mac Plus | Блог</title>
      </Helmet>

      <h1 className="d-none">Mac Plus - Блог</h1>

      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
            <li><ALink href="#" className="active">Блог</ALink></li>
          </ul>
        </div>
      </nav>

      <div className="page-content with-sidebar">
        <div className="container">
          <div className="row gutter-lg">
            <div className="col-lg-9">
              <div className="posts">
                {
                  loading ?
                    new Array(parseInt(perPage)).fill(1).map((item, index) => (
                      <div key={"Skeleton:" + index}>
                        <div className="skel-post"></div>
                      </div>
                    )) :
                    posts ?
                      posts.posts.data.slice(0, posts.length).map((post, index) => (
                        <React.Fragment key={"post-one" + index}>
                          <PostOne post={post} />
                        </React.Fragment>
                      )) :
                      <div className="info-box with-icon"><p className="mt-4">No blogs were found matching your selection.</p></div>
                }
              </div>

              <Pagination totalPage={totalPage} />
            </div>

            {/* <BlogSidebar /> */}
          </div>
        </div>
      </div >
    </main >
  )
}