import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import Helmet from 'react-helmet';
import imagesLoaded from 'imagesloaded';

import withApollo from '~/server/apollo';
import { GET_PRODUCT } from '~/server/queries';

import OwlCarousel from '~/components/features/owl-carousel';
import ALink from '~/components/features/custom-link';

import MediaFive from '~/components/partials/product/media/media-five';
import DetailThree from '~/components/partials/product/detail/detail-three';
import DescOne from '~/components/partials/product/desc/desc-one';
import RelatedProducts from '~/components/partials/product/related-products';
import ProductSidebar from '~/components/partials/product/product-sidebar';
import ProductNav from '~/components/partials/product/product-nav';

import { mainSlider17 } from '~/utils/data/carousel';
import { getProductById, getProductsAdvanced } from "~/utils/endpoints/products";
import { getDeliveryMethods } from "~/utils/endpoints/orders";

ProductDefault.getInitialProps = async ({ query }) => {
  const productRes = query.slug ? await getProductById(query.slug) : null;
  const product = await productRes;
  const featuredRes = await getProductsAdvanced(product.category._id, product._id);
  const featured = await featuredRes;
  const deliveryRes = await getDeliveryMethods();
  const deliveryMethods = await deliveryRes;
  return { product, featured, deliveryMethods }
}

export default function ProductDefault({ product, featured, deliveryMethods }) {

  if (!product) return '';

  return (
    <main className="main single-product">
      <Helmet>
        <title>Mac Plus | {product.name || ''}</title>
      </Helmet>

      <h1 className="d-none">Mac Plus - {product.name}</h1>

      {
        !!product ?
          <div className={`page-content mb-8`}>
            <div className="container skeleton-body">
              <div className="product-navigation">
                <ul className="breadcrumb breadcrumb-lg">
                  <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                  <li><ALink href="/shop" className="active">Каталог</ALink></li>
                  <li>{product.name}</li>
                </ul>
              </div>

              <div className="row gutter-lg">
                <ProductSidebar featured={featured.data} deliveryMethods={deliveryMethods} />

                <div className="col-lg-9">
                  <div className="product product-single row">
                    <div className="col-md-6">
                      <MediaFive product={product} adClass='pb-0' />
                    </div>

                    <div className="col-md-6">
                      <DetailThree product={product} isNav={false} />
                    </div>
                  </div>

                  <DescOne product={product} isDivider={false} className="mt-2 m-4" isGuide={false} />
                </div>
              </div>
            </div>
          </div> : ''
      }
    </main>
  )
}
