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
import IntroCategories from "~/components/partials/home/intro-categories";

HomePage.getInitialProps = async (context) => {
  const articles = await getLatestArticles();
  const recProducts = await getRecProducts();
  const slides = await getSlides();
  const features = await getFieldsObject('features_1', 'features_2', 'features_3', 'features_4');
  const fields = await getFieldsObject('trade-in-title', 'trade-in-subtitle' ,'trade-in-description', 'main-seo-title', 'main-seo-description');
  return {
    articles: articles.data,
    recProducts: recProducts.data,
    slides: slides.data,
    fields: fields,
    features: features,
  };
}

export default function HomePage({ articles, recProducts, slides, fields, features, categoryTree }) {


  return (
    <div className="main home mt-lg-4 homepage">
      <Helmet>
        <title>{fields['main-seo-title'] || 'Mac Plus'}</title>
        <meta property="og:title" content={fields['main-seo-title'] || 'Mac Plus'}/>
        <meta name="description" content={fields['main-seo-description'] || 'Интернет-магазин электроники в Беларуси'}/>
        <meta property="og:description" content={fields['main-seo-description'] || 'Интернет-магазин электроники в Беларуси'}/>
      </Helmet>

      <h1 className="d-none">{fields['main-seo-title'] || 'Mac Plus'}</h1>

      <div className="page-content">
        <IntroSection slides={slides}/>

        <IntroCategories categories={categoryTree}></IntroCategories>

        <CategorySection recProducts={recProducts}/>

        <BannerSection
          tradeInDescription={fields['trade-in-description']}
          tradeInSubtitle={fields['trade-in-subtitle']}
          tradeInTitle={fields['trade-in-title']}
        />

        <ServiceBox fields={features} />

        <BlogSection posts={articles} />
      </div>
    </div>
  )
}
