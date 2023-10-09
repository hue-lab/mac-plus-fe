import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import ALink from '~/components/features/custom-link';
import Quantity from '~/components/features/quantity';

import { cartActions } from '~/store/cart';

import { toDecimal, getTotalPrice } from '~/utils';
import { getDeliveryMethods } from '~/utils/endpoints/orders';
import { Helmet } from 'react-helmet';

function Cart(props) {
  const { cartList, removeFromCart, updateCart } = props;
  const [cartItems, setCartItems] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [currentRadio, setCurrentRadio] = useState(0);
  const [isDelivery, setIsDelivery] = useState(false);

  async function getDelivery() {
    const deliveryRes = await getDeliveryMethods();
    const res = await deliveryRes
    setDelivery(res);
    setIsDelivery(true);
  }

  useEffect(() => {
    setCartItems([...cartList]);
    getDelivery();
  }, [cartList])


  const onChangeQty = (name, qty) => {
    setCartItems(cartItems.map(item => {
      return item.name === name ? { ...item, qty: qty } : item
    }));
  }

  const compareItems = () => {
    if (cartItems.length !== cartList.length) return false;

    for (let index = 0; index < cartItems.length; index++) {
      if (cartItems[index].qty !== cartList[index].qty) return false;
    }

    return true;
  }

  const update = () => {
    updateCart(cartItems);
  }

  const radioHandler = (index) => {
    setCurrentRadio(index);
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
          <h3 className="title title-simple title-step"><ALink href="/pages/order">3. Подтверждение</ALink></h3>
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
                                  <ALink href={'/product/' + item._id}>
                                    <img src={process.env.API_HOST + '/storage/images/' + item.media[0]} width="100" height="100"
                                      alt="product" />
                                  </ALink>
                                </figure>
                              </td>
                              <td className="product-name">
                                <div className="product-name-section">
                                  <ALink href={'/product/' + item._id}>{item.name}</ALink>
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
                      {/* <button
                        type="submit"
                        className={`btn btn-outline btn-dark btn-md btn-rounded ${compareItems() ? ' btn-disabled' : ''}`}
                        onClick={update}
                      >
                        Update Cart
                      </button> */}
                    </div>
                    {/* <div className="cart-coupon-box mb-8">
                      <h4 className="title coupon-title text-uppercase ls-m">Coupon Discount</h4>
                      <input type="text" name="coupon_code" className="input-text form-control text-grey ls-m mb-4"
                        id="coupon_code" placeholder="Enter coupon code here..." />
                      <button type="submit" className="btn btn-md btn-dark btn-rounded btn-outline">Apply Coupon</button>
                    </div> */}
                  </div>
                  <aside className="col-lg-4 sticky-sidebar-wrapper">
                    <div className="sticky-sidebar" data-sticky-options="{'bottom': 20}">
                      <div className="summary mb-4">
                        <table className="shipping">
                          <tbody>
                            <tr className="summary-subtotal">
                              <td>
                                <h4 className="summary-subtitle">Сумма</h4>
                              </td>
                              <td>
                                <p className="summary-subtotal-price">{toDecimal(getTotalPrice(cartItems))} BYN</p>
                              </td>
                            </tr>
                            <tr className="sumnary-shipping shipping-row-last">
                              <td colSpan="2">
                                <h4 className="summary-subtitle">Способ доставки:</h4>
                                <ul>
                                  {delivery.map((item, index) => (
                                    <li key={item._id}>
                                      <div className="custom-radio">
                                        <input type="radio" id={item._id} name="shipping" className="custom-control-input" onChange={() => radioHandler(index)} defaultChecked={index === 0 ? true : false} />
                                        <label className="custom-control-label" htmlFor={item._id}>{item.name}</label>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="shipping-address">
                          {isDelivery ?
                            (
                              delivery[currentRadio].fields.length ? (
                                delivery[currentRadio].fields.map((item, index) => (
                                  <input type="text" className="form-control" name={item} placeholder={item} key={item + index} />
                                ))
                              ) : ''
                            )
                            : ''}
                        </div>
                        <table className="total">
                          <tbody>
                            <tr className="summary-subtotal">
                              <td>
                                <h4 className="summary-subtitle">Всего</h4>
                              </td>
                              <td>
                                <p className="summary-total-price ls-s">{toDecimal(getTotalPrice(cartItems))} BYN</p>
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