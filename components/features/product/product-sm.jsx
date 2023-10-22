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
            threshold={500}
            width="100"
            height="100"
            effect="opacity"
            style={{ objectFit: 'contain', padding: '0.75rem 1.25rem 1.25rem' }}
          />

          {
            product.media.length >= 2 ?
              <LazyLoadImage
                alt="product"
                src={getImgPath(product.media[1])}
                threshold={500}
                width="100"
                height="100"
                effect="opacity"
                wrapperClassName="product-image-hover"
                style={{ objectFit: 'contain', padding: '0.75rem 1.25rem 1.25rem' }}
              />
              : ""
          }
        </ALink>
      </figure>

      <div className="product-details">
        <h3 className="product-name related-name">
          <ALink href={`/product/${product._id}`}>{product.name}</ALink>
        </h3>

        <div className="product-price related-price">
          {
            product.price !== product.totalPrice ?
              <>
                <del className="old-price">{toDecimal(product.price)} BYN</del>
                <ins className="new-price">{toDecimal(product.totalPrice)} BYN</ins>
              </>
              : <ins className="new-price">{toDecimal(product.price)} BYN</ins>
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