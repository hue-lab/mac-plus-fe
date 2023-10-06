import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';

import { toDecimal, getImgPath } from '~/utils';

function SmallProduct(props) {
  const { product, adClass, isReviewCount = true } = props;

  return (
    <div className={`product product-list-sm ${adClass}`}>
      <figure className="product-media">
        <ALink href={`/product/${product._id}`}>
          <LazyLoadImage
            alt="product"
            src={getImgPath(product.media[0])}
            threshold={50}
            effect="opacity"
            width="50"
            height="50"
          />

          {
            product.media.length >= 2 ?
              <LazyLoadImage
                alt="product"
                src={getImgPath(product.media[1])}
                threshold={50}
                width="50"
                height="50"
                effect="opacity"
                wrapperClassName="product-image-hover"
              />
              : ""
          }
        </ALink>
      </figure>

      <div className="product-details">
        <h3 className="product-name">
          <ALink href={`/product/${product._id}`}>{product.name}</ALink>
        </h3>

        <div className="product-price">
          {
            product.price !== product.totalPrice ?
              <>
                <ins className="new-price">{product.totalPrice} BYN</ins>
                <del className="old-price">{product.price} BYN</del>
              </>
              : <ins className="new-price">{product.price} BYN</ins>
          }
        </div>

        <div className="brand">
          <span>{product.brand.name}</span>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SmallProduct);