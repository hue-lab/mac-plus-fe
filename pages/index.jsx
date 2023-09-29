import React from 'react';
import Helmet from 'react-helmet';

import IntroSection from '~/components/partials/home/intro-section';
import CategorySection from '~/components/partials/home/category-section';
import BannerSection from '~/components/partials/home/banner-section';
import ServiceBox from '~/components/partials/home/service-section';
import BlogSection from '~/components/partials/home/blog-section';
import { getCategoryTree } from "~/utils/endpoints/categoryTree";
import { getLatestArticles } from '~/utils/endpoints/articles';
import {getRecProducts} from "~/utils/endpoints/products";
import {getSlides} from "~/utils/endpoints/slides";

HomePage.getInitialProps = async (context) => {
  const categoryTree = await getCategoryTree();
  const articles = await getLatestArticles();
  const recProducts = await getRecProducts();
  const slides = await getSlides();
  return {
    categoryTree: categoryTree.children,
    articles: articles.data,
    recProducts: recProducts.data,
    slides: slides.data,
  };
}

export default function HomePage({ articles, recProducts, slides }) {


  return (
    <div className="main home mt-lg-4 homepage">
      <Helmet>
        <title>Mac Plus | Главная</title>
      </Helmet>

      <h1 className="d-none">Mac Plus - Главная</h1>

      <div className="page-content">
        <IntroSection slides={slides} />

        <CategorySection recProducts={recProducts} />

        <BannerSection />

        <ServiceBox />

        <BlogSection posts={articles} />
      </div>
    </div>
  )
}