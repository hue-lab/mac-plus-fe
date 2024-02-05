import { connect } from 'react-redux';

import ALink from '~/components/features/custom-link';

import { cartActions } from '~/store/cart';

import { getTotalPrice, getCartCount, toDecimal, getImgPath } from '~/utils';

function CartMenu(props) {
  const { cartList, removeFromCart } = props;

  const showCartMenu = (e) => {
    e.preventDefault();
    e.currentTarget.closest('.cart-dropdown').classList.add('opened');
  }

  const hideCartMenu = () => {
    if (document.querySelector('.cart-dropdown').classList.contains('opened'))
      document.querySelector('.cart-dropdown').classList.remove('opened');
  }

  const removeCart = (item) => {
    removeFromCart(item);
  }

  return (
    <div className="dropdown cart-dropdown type2 mr-0 mr-lg-2">
      <a href="#" className="cart-toggle label-block link" onClick={showCartMenu}>
        <span className="cart-label d-lg-show ls-normal">
          <span className="cart-name ls-m">Корзина:</span>
          <span className="cart-price">{toDecimal(getTotalPrice(cartList))} BYN</span>
        </span>
        <i className="d-icon-bag"><span className="cart-count">{getCartCount(cartList)}</span></i>
      </a>
      <div className="cart-overlay" onClick={hideCartMenu}></div>
      <div style={{zIndex: 10000}} className={`dropdown-box ${cartList.length > 0 ? '' : 'pl-0 pr-0 pt-2 pb-2'}`}>
        {
          cartList.length > 0 ?
            <div className="cart-header mb-4">
              <h4 className="cart-title">Корзина</h4>
              {/* <ALink href="#" className="btn btn-dark btn-link btn-icon-right btn-close" onClick={ hideCartMenu }>close<i
                                className="d-icon-arrow-right"></i><span className="sr-only">Cart</span></ALink> */}
            </div> : ''
        }
        {
          cartList.length > 0 ?
            <>
              <div className="products scrollable">
                {
                  cartList.map((item, index) =>
                    <div className="product product-cart" key={'cart-menu-product-' + index}>
                      <figure className="product-media pure-media">
                        <ALink href={`/${item.category.handle ? item.category.handle + '/' : ''}${item.seo?.seoUrl || '#'}`} onClick={hideCartMenu}>
                          <img src={getImgPath(item.media[0])} alt="product" width="70"
                            height="70" />
                        </ALink>
                        <button className="btn btn-link btn-close" onClick={() => { removeCart(item) }}>
                          <i className="fas fa-times"></i><span className="sr-only">Закрыть</span>
                        </button>
                      </figure>
                      <div className="product-detail">
                        <ALink href={`/${item.category.handle ? item.category.handle + '/' : ''}${item.seo?.seoUrl || '#'}`} className="product-name" onClick={hideCartMenu}>{item.name}</ALink>
                        <div className="price-box">
                          <span className="product-quantity">{item.qty}</span>
                          <span className="product-price">{toDecimal(item.price)} BYN</span>
                        </div>
                      </div>
                    </div>
                  )}
              </div>

              <div className="cart-total">
                <label>Сумма:</label>
                <span className="price">{toDecimal(getTotalPrice(cartList))} BYN</span>
              </div>

              <div className="cart-action">
                <ALink href="/pages/cart" className="btn btn-dark btn-link" onClick={hideCartMenu}>Корзина</ALink>
                <ALink href="/pages/checkout" className="btn btn-dark" onClick={hideCartMenu}><span>Оформить заказ</span></ALink>
              </div>
            </> :
            <p className="mt-4 text-center font-weight-semi-bold ls-normal text-body">Корзина пуста.</p>
        }
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data
  }
}

export default connect(mapStateToProps, { removeFromCart: cartActions.removeFromCart })(CartMenu);
