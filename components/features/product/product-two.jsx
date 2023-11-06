import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';

import ALink from '~/components/features/custom-link';

import { cartActions } from '~/store/cart';
import { modalActions } from '~/store/modal';
import { wishlistActions } from '~/store/wishlist';

import { getImgPath, toDecimal } from '~/utils';

function ProductTwo(props) {
  const { product, adClass = 'text-center', addToCart, isCat = true } = props;

  const addToCartHandler = (e) => {
    e.preventDefault();
    addToCart({ ...product, qty: 1, price: product.totalPrice });
  }

  return (
    <div className={`product ${adClass}`}>
      <figure className="product-media">
        <ALink href={`/${product.seo?.seoUrl || '#'}`}>
          <LazyLoadImage
            alt="product"
            src={getImgPath(product.media[0])}
            threshold={500}
            effect="opacity"
            width="300"
            height="338"
            wrapperProps={{ style: { height: '100%', padding: '1rem' } }}
            style={{ objectFit: 'contain', height: '100%', objectPosition: 'center' }}
          />
        </ALink>

        <div className="product-label-group">
          {product.isNew ? <label className="product-label label-new">Новинка</label> : ''}
          {product.isRec ? <label className="product-label label-top">Хит</label> : ''}
          {
            product.discount > 0 ?
              <label className="product-label label-sale">-{product.discount}%</label>
              : ''
          }
        </div>

        <div className="product-action-vertical">
          {
            0 > 0 ?
              <ALink href={`/${product.seo?.seoUrl || '#'}`} className="btn-product-icon btn-cart" title="Go to product">
                <i className="d-icon-arrow-right"></i>
              </ALink> :
              <a href="#" className="btn-product-icon btn-cart" title="Add to cart" onClick={addToCartHandler}>
                <i className="d-icon-bag"></i>
              </a>
          }
        </div>

        <div className="product-action">
          <ALink href={`/${product.seo?.seoUrl || '#'}`} className="btn-product btn-quickview" title="Quick View">Подробнее</ALink>
        </div>
      </figure>

      <div className="product-details" style={{ paddingBottom: '1rem' }}>
        <h3 className="product-name">
          <ALink href={`/${product.seo?.seoUrl || '#'}`}>{product.name}</ALink>
        </h3>

        <div className="product-price shop-price">
          {
            product.discount > 0 ?
              <>
                <ins className="new-price">{toDecimal(product.totalPrice)} BYN</ins>
                <del className="old-price">{toDecimal(product.price)} BYN</del>
              </>
              : <ins className="new-price">{toDecimal(product.price)} BYN</ins>
          }
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.data ? state.wishlist.data : []
  }
}

export default connect(mapStateToProps, { toggleWishlist: wishlistActions.toggleWishlist, addToCart: cartActions.addToCart, ...modalActions })(ProductTwo);