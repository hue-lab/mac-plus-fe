import React from 'react';

import ALink from '~/components/features/custom-link';

import { toDecimal, getImgPath } from '~/utils';

export default function CartPopup(props) {
  const { product } = props;

  return (
    <div className="minipopup-area">
      <div className="minipopup-box show" style={{ top: "0" }}>
        <p className="minipopup-title">Добавлено в корзину:</p>

        <div className="product product-purchased  product-cart mb-0">
          <figure className="product-media pure-media">
            <ALink href={`/${product.seo?.seoUrl || '#'}`}>
              <img
                src={getImgPath(product.media[0])}
                alt="product"
                width="90"
                height="90"
              />
            </ALink>
          </figure>
          <div className="product-detail">
            <ALink href={`/product/${product._id}`} className="product-name">{product.name}</ALink>
            <span className="price-box">
              <span className="product-quantity">{product.qty}</span>
              <span className="product-price">{toDecimal(product.price)} BYN</span>
            </span>
          </div>
        </div>

        <div className="action-group d-flex">
          <ALink href="/pages/cart" className="btn btn-sm btn-outline btn-primary btn-rounded">Корзина</ALink>
          <ALink href="/pages/checkout" className="btn btn-sm btn-primary btn-rounded">Оформить</ALink>
        </div>
      </div>
    </div>
  )
}