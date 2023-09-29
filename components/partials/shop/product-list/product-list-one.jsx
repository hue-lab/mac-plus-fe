import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';

import ToolBox from '~/components/partials/shop/toolbox';
import ProductTwo from '~/components/features/product/product-two';
import ProductEight from '~/components/features/product/product-eight';
import Pagination from '~/components/features/pagination';

import withApollo from '~/server/apollo';
import { GET_PRODUCTS } from '~/server/queries';

export  default function ProductListOne({ itemsPerRow = 3, type = "left", isToolbox = true, products }) {
  const router = useRouter();
  const query = router.query;
  //const [ getProducts, { data, loading, error } ] = useLazyQuery( GET_PRODUCTS );
  const loading = false;
  const gridClasses = {
    3: "cols-2 cols-sm-3",
    4: "cols-2 cols-sm-3 cols-md-4",
    5: "cols-2 cols-sm-3 cols-md-4 cols-xl-5",
    6: "cols-2 cols-sm-3 cols-md-4 cols-xl-6",
    7: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-7",
    8: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-8"
  }
  const perPage = query.per_page ? parseInt(query.per_page) : 12;
  const totalPage = products?.data ? parseInt(products.metadata.lastPage) : 1;
  const productsData = products?.data;
  const page = query.page ? query.page : 1;
  const gridType = query.type ? query.type : 'grid';

  return (
    <>
      {
        isToolbox ? <ToolBox type={type} /> : ''
      }
      {
        loading ?
          gridType === 'grid' ?
            <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
              {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) =>
                  <div className="product-loading-overlay" key={'popup-skel-' + item}></div>
                )
              }
            </div> :
            <div className="row product-wrapper skeleton-body cols-1">
              {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) =>
                  <div className="skel-pro skel-pro-list mb-4" key={'list-skel-' + item}></div>
                )
              }
            </div>
          : ''
      }
      {
        gridType === 'grid' ?
          <div className={`row product-wrapper gutter-no split-line ${gridClasses[itemsPerRow]}`}>
            {products && productsData.map((item, index) =>
              <div className="product-wrap" key={index}>
                <ProductTwo product={item} isCat={false} />
              </div>
            )}
          </div>
          :
          <div className="product-lists product-wrapper">
            {products && productsData.map((item, index) =>
              <ProductEight product={item} key={index} />
            )}
          </div>
      }

      {
        productsData && products?.metadata?.total === 0 ?
          <p className="ml-1">No products were found matching your selection.</p> : ''
      }

      {
        productsData && products?.metadata.total > 0 ?
          <div className="toolbox toolbox-pagination">
            {
              productsData && <p className="show-info">Показано<span>{ productsData.length || 0 } из { products.metadata.total }</span>продуктов</p>
            }

            <Pagination totalPage={totalPage} />
          </div> : ''
      }
    </>
  )
}