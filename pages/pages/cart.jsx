import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import ALink from '~/components/features/custom-link';
import Quantity from '~/components/features/quantity';
import { cartActions } from '~/store/cart';
import { toDecimal, getImgPath, useDebounce } from '~/utils';
import { getCalculation } from "~/utils/endpoints/calculate";

function Cart(props) {
  const { cartList, removeFromCart, updateCart } = props;
  const [cartItems, setCartItems] = useState([]);
  const debouncedCartItems = useDebounce(cartList, 400);
  const [discount, setDiscount] = useState(0);
  const [subTotalPrice, setSubtotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartItems([...cartList]);
    if (cartItems.length) {
      const products = cartItems.map(item => ({ productId: item._id, count: item.qty }));
      getCalculation(products).then(res => {
        setDiscount(res?.totalDiscount || 0);
        setSubtotalPrice(res?.orderPrice || 0);
        setTotalPrice(res?.totalPrice || 0);
      });
    }
  }, [debouncedCartItems]);

  const onChangeQty = (name, qty) => {
    const newCartItems = cartItems.map(item => {
      return item.name === name ? { ...item, qty: qty } : item
    });
    updateCart(newCartItems);
    setCartItems(newCartItems);
  }

  return (
    <div className="main cart border-no">
      <Helmet>
        <title>Mac Plus | Корзина</title>
      </Helmet>

      <h1 className="d-none">Mac Plus - Корзина</h1>

      <div className="page-content pt-7 pb-10">
        <div className="step-by pr-4 pl-4">
          <h3 className="title title-simple title-step active"><ALink href="#">1. Корзина</ALink></h3>
          <h3 className="title title-simple title-step"><ALink href="/pages/checkout">2. Оформление</ALink></h3>
          <h3 className="title title-simple title-step">3. Подтверждение</h3>
        </div>

        <div className="container mt-7 mb-2">
          <div className="row">
            {
              cartItems.length > 0 ?
                <>
                  <div className="col-lg-8 col-md-12 pr-lg-4">
                    <table className="shop-table cart-table">
                      <thead>
                        <tr>
                          <th><span>Товар</span></th>
                          <th></th>
                          <th><span>Цена</span></th>
                          <th><span>Количество</span></th>
                          <th>Стоимость</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          cartItems.map(item =>
                            <tr key={'cart' + item.name}>
                              <td className="product-thumbnail">
                                <figure>
                                  <ALink href={'/' + item.seo?.seoUrl || '#'}>
                                    <img src={getImgPath(item.media[0])} width="100" height="100"
                                      alt="product" />
                                  </ALink>
                                </figure>
                              </td>
                              <td className="product-name">
                                <div className="product-name-section">
                                  <ALink href={'/' + item.seo?.seoUrl || '#'}>{item.name}</ALink>
                                </div>
                              </td>
                              <td className="product-subtotal">
                                <span className="amount">{toDecimal(item.totalPrice)} BYN</span>
                              </td>
                              <td className="product-quantity">
                                <Quantity qty={item.qty} max={1000} onChangeQty={qty => onChangeQty(item.name, qty)} />
                              </td>
                              <td className="product-price">
                                <span className="amount">{toDecimal(item.totalPrice * item.qty)} BYN</span>
                              </td>
                              <td className="product-close">
                                <ALink href="#" className="product-remove" title="Remove this product" onClick={() => removeFromCart(item)}>
                                  <i className="fas fa-times"></i>
                                </ALink>
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                    <div className="cart-actions mb-6 pt-4">
                      <ALink href="/shop" className="btn btn-dark btn-md btn-rounded btn-icon-left mr-4 mb-4"><i className="d-icon-arrow-left"></i>Вернуться в каталог</ALink>
                    </div>
                  </div>
                  <aside className="col-lg-4 sticky-sidebar-wrapper">
                    <div className="sticky-sidebar" data-sticky-options="{'bottom': 20}">
                      <div className="summary mb-4">
                        <table className="shipping">
                          <tbody>
                            <tr>
                              <td>
                                <h4 className="summary-subtitle">Сумма</h4>
                              </td>
                              <td>
                                <p className="summary-subtotal-price">{toDecimal(subTotalPrice)} BYN</p>
                              </td>
                            </tr>
                            <tr className="summary-subtotal">
                              <td>
                                <h4 className="summary-subtitle">Скидка</h4>
                              </td>
                              <td>
                                <p className="summary-subtotal-price">{toDecimal(discount)} BYN</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table className="total">
                          <tbody>
                            <tr className="summary-subtotal">
                              <td>
                                <h4 className="summary-subtitle">Всего</h4>
                              </td>
                              <td>
                                <p className="summary-total-price ls-s">{toDecimal(totalPrice)} BYN</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <ALink href="/pages/checkout" className="btn btn-dark btn-rounded btn-checkout">Оформить заказ</ALink>
                      </div>
                    </div>
                  </aside>
                </>
                :
                <div className="empty-cart text-center">
                  <p>Ваша корзина сейчас пуста.</p>
                  <i className="cart-empty d-icon-bag"></i>
                  <p className="return-to-shop mb-0">
                    <ALink className="button wc-backward btn btn-dark btn-md" href="/shop">
                      В каталог
                    </ALink>
                  </p>
                </div>
            }
          </div>
        </div>
      </div>
    </div >
  )
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : []
  }
}

export default connect(mapStateToProps, { removeFromCart: cartActions.removeFromCart, updateCart: cartActions.updateCart })(Cart);