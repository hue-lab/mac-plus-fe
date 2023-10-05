import React, {useEffect} from 'react';
import Helmet from 'react-helmet';

import ALink from '~/components/features/custom-link';

import SidebarFilterOne from '~/components/partials/shop/sidebar/sidebar-filter-one'
import ProductListOne from '~/components/partials/shop/product-list/product-list-one';
import {getBannerSlide} from "~/utils/endpoints/slides";
import {getImgPath} from "~/utils";
import {getProducts} from "~/utils/endpoints/products";
import {getFilters} from "~/utils/endpoints/filters";
import {useRouter} from "next/router";

Shop.getInitialProps = async ({ query }) => {
  const filters = await getFilters(query.category);
  const banner = await getBannerSlide();
  const { category, page, per_page, price, sortby, type, ...customProperties } = query;
  const requestFilters = {
    baseProperties: {},
    customProperties: {},
    preview: true,
    pagination: {
      page: Number(page) || 1,
      limit: Number(per_page) || 12,
    }
  };
  console.log(requestFilters);
  if (customProperties && Object.keys(customProperties).length) {
    requestFilters.customProperties = Object.keys(customProperties).reduce((acc, key) => {
      acc[key] = {
        $in: customProperties[key]?.split(',') || [],
      };
      return acc;
    }, {});
  }
  if (category) {
    requestFilters.baseProperties.categoryId = {
      $eq: category
    }
  }
  if (sortby) {
    switch (sortby) {
      case 'price-low':
        requestFilters.sort = {
          direction: 1,
          property: 'totalPrice',
        };
        break;
      case 'price-high':
        requestFilters.sort = {
          direction: -1,
          property: 'totalPrice',
        };
        break;
    }
  }
  const products = await getProducts(requestFilters);
  return { banner: banner.data[0], products, filters };
}

export default function Shop({ banner, products, filters }) {
  return (
    <main className="main bt-lg-none shop">
      <Helmet>
        <title>Mac Plus | Каталог</title>
      </Helmet>

      <h1 className="d-none">Mac Plus - Каталог</h1>

      <div className="page-content mb-10 pb-2">
        <div className="container">
          <ul className="breadcrumb breadcrumb-sm">
            <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
            <li>Каталог</li>
          </ul>

          <div className="row gutter-lg main-content-wrap">
            <SidebarFilterOne filters={filters} type="banner" />

            <div className="col-lg-9 main-content">
              { banner && <div className="shop-banner banner" style={{ backgroundImage: `url('${getImgPath(banner.media)}')`, backgroundColor: "#f2f2f3" }}>
                <div className="banner-content">
                  <h4
                    className="banner-subtitle d-inline-block mb-2 text-uppercase ls-normal bg-dark"
                    style={{ color: 'white', padding: '.5rem 1rem' }}
                  >{ banner.description }</h4>
                  <h1 className="banner-title font-weight-bold ls-normal text-uppercase">{ banner.title }</h1>
                  <ALink href={`/blog/single/${banner._id}`} className="btn btn-outline btn-dark btn-rounded">Подробнее</ALink>
                </div>
              </div> }

              <ProductListOne products={products} type="banner" />
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}