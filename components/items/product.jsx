import React from "react";
import Helmet from "react-helmet";

import ALink from "~/components/features/custom-link";
import MediaFive from "~/components/partials/product/media/media-five";
import DetailThree from "~/components/partials/product/detail/detail-three";
import DescOne from "~/components/partials/product/desc/desc-one";
import ProductSidebar from "~/components/partials/product/product-sidebar";
import { getImgPath } from "~/utils";

export default function ProductItem({ product, featured, deliveryMethods, seoFields }) {
  if (!product) return "";

  const ogImage = product.seo?.seoImage[0];
  const titleString = `${product.seo?.seoTitle || product.name || "Mac Plus"}`;
  const descriptionString = `${product.seo?.seoTitle || product.name || ""}`;
  const categoryString = `${product.category.name}`;
  const headerString = `${product.name}`;

  const interpolatedTitle = seoFields["product-seo-title"].replaceAll("{TITLE}", titleString);
  const interpolatedDescription = seoFields["product-seo-description"]
    .replaceAll("{TITLE}", descriptionString)
    .replaceAll("{CATEGORY}", categoryString);
  const interpolatedHeader = seoFields["product-seo-header"].replaceAll("{TITLE}", headerString);

  return (
    <main className="main single-product">
      <Helmet>
        <title>{interpolatedTitle}</title>
        <meta property="og:title" content={interpolatedTitle} />
        <meta name="description" content={interpolatedDescription} />
        <meta property="og:description" content={interpolatedDescription} />
        <meta name="keywords" content={product.seo?.seoKeywords?.join(", ")} />
        {ogImage && <meta property="og:image" content={getImgPath(ogImage.imageName)} />}
      </Helmet>

      <h1 className="d-none">{interpolatedHeader}</h1>

      {!!product ? (
        <div className={`page-content mb-8`}>
          <div className="container skeleton-body">
            <div className="product-navigation">
              <ul className="breadcrumb breadcrumb-lg">
                <li>
                  <ALink href="/">
                    <i className="d-icon-home"></i>
                  </ALink>
                </li>
                <li>
                  <ALink href="/shop" className="active">
                    Каталог
                  </ALink>
                </li>
                <li>
                  <ALink href={`/${product.category.handle}/`} className="active">
                    {product.category.name}
                  </ALink>
                </li>
                <li>{product.name}</li>
              </ul>
            </div>

            <div className="row gutter-lg">
              <ProductSidebar
                featured={featured?.data || []}
                deliveryMethods={deliveryMethods || []}
              />

              <div className="col-lg-9">
                <div className="product product-single row">
                  <div className="col-md-6">
                    <MediaFive product={product} adClass="pb-0" />
                  </div>

                  <div className="col-md-6">
                    <DetailThree product={product} isNav={false} />
                  </div>
                </div>

                <DescOne product={product} isDivider={false} className="mt-2 m-4" isGuide={false} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </main>
  );
}
