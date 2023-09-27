import React from 'react';
import Helmet from 'react-helmet';

// import Home Components
import IntroSection from '~/components/partials/home/intro-section';
import CategorySection from '~/components/partials/home/category-section';
import BannerSection from '~/components/partials/home/banner-section';
import ServiceBox from '~/components/partials/home/service-section';
import BlogSection from '~/components/partials/home/blog-section';
import {getCategoryTree} from "~/utils/endpoints/categoryTree";

HomePage.getInitialProps = async (context) => {
  const categoryTree = await getCategoryTree();
  return { categoryTree: categoryTree.children };
}

export default function HomePage({ categoryTree }) {
  const posts = [
    {
      type: '',
      slug: '',
      large_picture: [
        {
          url: '',
          height: 0,
        },
      ],
      picture: [
        {
          url: '',
          height: 0,
        },
      ],
    },
    {
      type: '',
      slug: '',
      large_picture: [
        {
          url: '',
          height: 0,
        },
      ],
      picture: [
        {
          url: '',
          height: 0,
        },
      ],
    },
    {
      type: '',
      slug: '',
      large_picture: [
        {
          url: '',
          height: 0,
        },
      ],
      picture: [
        {
          url: '',
          height: 0,
        },
      ],
    },
    {
      type: '',
      slug: '',
      large_picture: [
        {
          url: '',
          height: 0,
        },
      ],
      picture: [
        {
          url: '',
          height: 0,
        },
      ],
    },
    {
      type: '',
      slug: '',
      large_picture: [
        {
          url: '',
          height: 0,
        },
      ],
      picture: [
        {
          url: '',
          height: 0,
        },
      ],
    },
  ];

  return (
    <div className="main home mt-lg-4 homepage">
      <Helmet>
        <title>Mac Plus | Главная</title>
      </Helmet>

      <h1 className="d-none">Mac Plus - Главная</h1>

      <div className="page-content">
        <IntroSection />

        <CategorySection categoryTree={categoryTree} />

        <BannerSection />

        <ServiceBox />

        <BlogSection posts={posts} />
      </div>
    </div>
  )
}