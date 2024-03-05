import React, {useEffect} from 'react';
import Helmet from 'react-helmet';
import ALink from '~/components/features/custom-link';
import SidebarFilterOne from '~/components/partials/shop/sidebar/sidebar-filter-one'
import ProductListOne from '~/components/partials/shop/product-list/product-list-one';
import {getImgPath} from "~/utils";

export default function Category({ banner, products, filters, category, page, filterObject, fullPath }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }, [page, filters]);

  return (
    <main className="main bt-lg-none shop">
      <Helmet>
        <title>{ category.title ||  category.name || 'Каталог' }</title>
        <meta property="og:title" content={category.title ||  category.name || 'Каталог'} />
        <meta name="description" content={category.description || category.name || ''} />
        <meta property="og:description" content={category.description || category.name || ''} />
        <meta name="keywords" content={(category.keywords || []).join(', ')} />
      </Helmet>

      <h1 className="d-none">Mac Plus - { category.name || 'Каталог' }</h1>

      <div className="page-content mb-10 pb-2">
        <div className="container">
          <ul className="breadcrumb breadcrumb-sm">
            <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
            <li><ALink href="/shop">Каталог</ALink></li>
            { category?.name && <li>{ category.name }</li> }
          </ul>

          <div className="row gutter-lg main-content-wrap">
            <SidebarFilterOne filters={filters} type="banner" filterObject={filterObject} />

            <div className="col-lg-9 main-content">
              { banner && <div className="shop-banner banner" title={banner.seo?.seoImageAlt || ''} style={{ backgroundImage: `url('${getImgPath(banner.media)}')`, backgroundColor: "#f2f2f3" }}>
                <div className="banner-content">
                  <h4
                    className="banner-subtitle d-inline-block mb-2 text-uppercase ls-normal bg-dark"
                    style={{ color: 'white', padding: '.5rem 1rem' }}
                  >{ banner.description }</h4>
                  <h1 className="banner-title font-weight-bold ls-normal text-uppercase">{ banner.title }</h1>
                  <ALink href={`/blog/${banner.seo?.seoUrl || '#'}`} className="btn btn-outline btn-dark btn-rounded">Подробнее</ALink>
                </div>
              </div> }

              <ProductListOne products={products} type="banner" fullPath={fullPath} />
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}
