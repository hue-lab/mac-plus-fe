import { useEffect, useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';

import ToolBox from '~/components/partials/shop/toolbox';
import ProductTwo from '~/components/features/product/product-two';
import ProductEight from '~/components/features/product/product-eight';

export default function ProductListTwo() {
  const router = useRouter();
  const query = router.query;
  const [products, setProducts] = useState([]);
  const data = null;
  const newData = null;
  const loading = false;
  const totalCount = data && data.products.total;
  const gridType = query.type ? query.type : 'grid';

  useLayoutEffect(() => {
    data && setProducts(data.products.data);
  }, [data])

  useEffect(() => {
    let newProducts = newData ? newData.products.data : [];
    setProducts([...products, ...newProducts]);
  }, [newData])

  return (
    <>
      <ToolBox />

      <InfiniteScroll
        dataLength={products ? products.length : 0}
        style={{ overflow: "visible" }}
        hasMore={products.length >= totalCount ? false : true}
        loader={<div className="d-loading"></div>}
      >
        {
          loading ?
            gridType === 'grid' ?
              <div className={`row product-wrapper cols-2 cols-sm-3`}>
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
            <div className={`row product-wrapper cols-2 cols-sm-3 gutter-no split-line`}>
              {products.length > 0 && products.map(item =>
                <div className="product-wrap" key={'shop-' + item.slug}>
                  <ProductTwo product={item} isCat={false} />
                </div>
              )}
            </div>
            :
            <div className="product-lists product-wrapper">
              {products.length > 0 && products.map(item =>
                <ProductEight product={item} key={'shop-list-' + item.slug} />
              )}
            </div>
        }

        {
          products && products.length === 0 ?
            <p className="ml-1">No products were found matching your selection.</p> : ''
        }

      </InfiniteScroll>
    </>
  )
}