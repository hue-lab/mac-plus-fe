import React from 'react';
import Helmet from 'react-helmet';

import IntroSection from '~/components/partials/home/intro-section';
import CategorySection from '~/components/partials/home/category-section';
import BannerSection from '~/components/partials/home/banner-section';
import ServiceBox from '~/components/partials/home/service-section';
import BlogSection from '~/components/partials/home/blog-section';

import { getLatestArticles } from '~/utils/endpoints/articles';
import { getRecProducts } from "~/utils/endpoints/products";
import { getSlides } from "~/utils/endpoints/slides";
import { getFieldsObject } from '~/utils/endpoints/fields';

HomePage.getInitialProps = async (context) => {
  const articles = await getLatestArticles();
  const recProducts = await getRecProducts();
  const slides = await getSlides();
  const features = await getFieldsObject('features_1', 'features_2', 'features_3', 'features_4');
  const fields = await getFieldsObject('trade-in-title', 'trade-in-description');
  return {
    articles: articles.data,
    recProducts: recProducts.data,
    slides: slides.data,
    fields: fields,
    features: features,
  };
}

export default function HomePage({ articles, recProducts, slides, fields, features }) {


  return (
    <div className="main home mt-lg-4 homepage">
      <Helmet>
        <title>Mac Plus | Главная</title>
      </Helmet>

      <h1 className="d-none">Mac Plus - Главная</h1>

      <div className="page-content">
        <IntroSection slides={slides} />

        <CategorySection recProducts={recProducts} />

        <BannerSection tradeInDescription={fields['trade-in-description']} tradeInTitle={fields['trade-in-title']} />

        <ServiceBox fields={features} />

        <BlogSection posts={articles} />
      </div>
    </div>
  )
}
