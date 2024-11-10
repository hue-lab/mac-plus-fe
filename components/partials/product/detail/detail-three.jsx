import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';

import ProductNav from '~/components/partials/product/product-nav';
import DescTwo from '~/components/partials/product/desc/desc-two';

import { wishlistActions } from '~/store/wishlist';
import { cartActions } from '~/store/cart';

import { toDecimal } from '~/utils';

function DetailThree(props) {
  let router = useRouter();
  const { product, isSticky = false, isDesc = false, adClass = '', isSizeGuide = true, isNav = true, openModal, productName } = props;
  const { toggleWishlist, addToCart, wishlist } = props;
  const [curColor, setCurColor] = useState('null');
  const [curSize, setCurSize] = useState('null');
  const [curIndex, setCurIndex] = useState(0);
  const [cartActive, setCartActive] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setCurIndex(-1);
    resetValueHandler();
  }, [product]);

  useEffect(() => {
    setCartActive(true);

    if (!product.isStock) {
      setCartActive(false);
    }
  }, [curColor, curSize, product]);

  const toggleColorHandler = (color) => {
    if (!isDisabled(color.name, curSize)) {
      if (curColor === color.name) {
        setCurColor('null');
      } else {
        setCurColor(color.name);
      }
    }
  };

  const toggleSizeHandler = (size) => {
    if (!isDisabled(curColor, size.name)) {
      if (curSize === size.name) {
        setCurSize('null');
      } else {
        setCurSize(size.name);
      }
    }
  };

  const addToCartHandler = () => {
    if (cartActive) {
      let tmpName = product.name;
      let tmpPrice = product.totalPrice ? product.totalPrice : product.price;
      tmpName += curColor !== 'null' ? '-' + curColor : '';
      tmpName += curSize !== 'null' ? '-' + curSize : '';
      addToCart({ ...product, name: tmpName, qty: quantity, price: tmpPrice });
    }
  };

  const orderOneClick = () => {
    if (cartActive) {
      addToCartHandler();
      router.push('/pages/cart');
    }
  };

  const resetValueHandler = (e) => {
    setCurColor('null');
    setCurSize('null');
  };

  function isDisabled(color, size) {}

  function changeQty(qty) {
    setQuantity(qty);
  }

  return (
    <div className={`product-details ${isSticky ? 'sticky' : ''} ${adClass}`}>
      {isNav ? (
        <div className="product-navigation pt-0">
          <ul className="breadcrumb breadcrumb-lg">
            <li>
              <ALink href="/">
                <i className="d-icon-home"></i>
              </ALink>
            </li>
            <li>
              <ALink href="#" className="active">
                Products
              </ALink>
            </li>
            <li>Detail</li>
          </ul>

          <ProductNav product={product} />
        </div>
      ) : (
        ''
      )}

      <h1 className="product-name" itemProp="name">
        {productName}
      </h1>

      <div className="product-meta">
        Категория: <span className="product-brand">{product.category.name}</span>
      </div>

      <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="product-price">
        {product.discount > 0 ? (
          <>
            <meta itemProp="price" content={product.totalPrice} />
            <ins className="new-price">от {toDecimal(product.totalPrice)} BYN</ins>
            <del className="old-price">{toDecimal(product.price)} BYN</del>
          </>
        ) : (
          <>
            <meta itemProp="price" content={product.price} />
            <ins className="new-price">от {toDecimal(product.price)} BYN</ins>
          </>
        )}
        <meta itemProp="priceCurrency" content="BYN" />
      </div>

      <p className="product-short-desc" itemProp="description">
        {product.description}
      </p>

      <hr className="product-divider"></hr>

      <div className="product-form product-qty pb-0">
        <label className="d-none">QTY:</label>
        <div className="product-form-group">
          {product.isStock ? (
            <>
              {/*<Quantity*/}
              {/*  max={1000}*/}
              {/*  product={product}*/}
              {/*  onChangeQty={changeQty}*/}
              {/*  isStock={product.isStock}*/}
              {/*/>*/}
              <button className={`btn-product btn-cart btn-cart-fast text-normal ls-normal font-weight-semi-bold ${cartActive ? '' : 'disabled'}`} onClick={addToCartHandler}>
                <i className="d-icon-bag"></i>В корзину
              </button>
              <button className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${cartActive ? '' : 'disabled'}`} onClick={() => openModal(true)}>
                Купить сразу
              </button>
            </>
          ) : (
            <>
              <span>Под заказ</span>
              <button className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold`} onClick={() => openModal(true)}>
                Заказать
              </button>
            </>
          )}
        </div>
      </div>

      <hr className="product-divider mb-3"></hr>

      <div className="product-footer"></div>

      {isDesc ? <DescTwo product={product.data} adClass={adClass} isSizeGuide={isSizeGuide} /> : ''}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.data ? state.wishlist.data : [],
  };
}

export default connect(mapStateToProps, {
  toggleWishlist: wishlistActions.toggleWishlist,
  addToCart: cartActions.addToCart,
})(DetailThree);
