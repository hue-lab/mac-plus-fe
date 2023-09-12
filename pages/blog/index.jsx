import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { useLazyQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

// Import Apollo Server and Query
import withApollo from '~/server/apollo';
import { GET_POSTS } from '~/server/queries';

import ALink from '~/components/features/custom-link';
import Pagination from '~/components/features/pagination';

import PostOne from '~/components/features/post/post-one';
import BlogSidebar from '~/components/partials/post/blog-sidebar';

import { scrollTopHandler } from '~/utils';

function Classic() {
  const router = useRouter();
  const [isFirst, setFirst] = useState(true);
  const query = router.query;
  const showingCount = 8;
  //const [ getPosts, { data, loading, error } ] = useLazyQuery( GET_POSTS );
  const data = {
    posts: {
      data: [
        {
          author: 'John Doe',
          title: 'Lorem ipsum',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt euismod interdum. Maecenas interdum dictum purus sit amet lacinia. Ut orci felis, facilisis vitae risus ac, pharetra molestie ligula. Aliquam tincidunt venenatis purus quis eleifend. Nam eget ullamcorper libero. Curabitur lacinia auctor arcu, a dictum lectus. Etiam eget condimentum urna.',
          picture: [],
          slug: 'lorem-ipsum',
        },
        {
          author: 'Jane Doe',
          title: 'Fusce in euismod massa',
          content: 'Fusce in euismod massa. Integer blandit porttitor dictum. Quisque et tincidunt nunc. Donec pellentesque interdum velit nec volutpat. Fusce a ullamcorper neque, eu convallis risus. Vestibulum molestie mauris tellus. Duis sollicitudin lobortis nisi, sed iaculis massa posuere ut. Sed tortor ante, dignissim eget mi sit amet, luctus pulvinar arcu.',
          picture: [],
          slug: 'fusce-in',
        },
      ],
    }
  };
  const loading = false;
  const [perPage, setPerPage] = useState(showingCount);
  const posts = data && data.posts.data;
  const totalPage = data ? parseInt(data.posts.total / perPage) + (data.posts.total % perPage ? 1 : 0) : 1;
  let page = query.page ? query.page : 1;

  // useEffect( () => {
  //     getPosts( {
  //         variables: {
  //             category: query.category,
  //             from: perPage * ( page - 1 ),
  //             to: perPage * page
  //         }
  //     } );

  //     setTimeout( () => {
  //         if ( isFirst ) {
  //             setFirst( false );
  //         } else {
  //             scrollTopHandler();
  //         }
  //     }, 100 );
  // }, [ query ] )

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
                      posts.length ?
                        posts.slice(0, posts.length).map((post, index) => (
                          <React.Fragment key={"post-one" + index}>
                            <PostOne post={post} />
                          </React.Fragment>
                        )) :
                        <div className="info-box with-icon"><p className="mt-4">No blogs were found matching your selection.</p></div>
                      : ''
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

export default withApollo({ ssr: typeof window === "undefined" })(Classic);