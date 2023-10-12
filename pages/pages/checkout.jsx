import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import SlideToggle from 'react-slide-toggle';
import { Collapse } from 'react-bootstrap';

import ALink from '~/components/features/custom-link';
import Card from '~/components/features/accordion/card'

import { toDecimal, getTotalPrice } from '~/utils';
import { getDeliveryMethods } from '~/utils/endpoints/orders';

function Checkout(props) {
  const { cartList } = props;
  const [isFirst, setFirst] = useState(false);
  const [delivery, setDelivery] = useState([]);
  const [currentRadio, setCurrentRadio] = useState(0);
  const [isDelivery, setIsDelivery] = useState(false);
  const [payment, setPayment] = useState(0);

  async function getDelivery() {
    const res = await getDeliveryMethods();
    setDelivery(res);
    setIsDelivery(true);
  }

  useEffect(() => {
    getDelivery();
  }, [cartList])

  const radioHandler = (index) => {
    setCurrentRadio(index);
  }

  return (
    <main className="main checkout border-no">
      <Helmet>
        <title>Mac Plus | Оформление</title>
      </Helmet>

      <h1 className="d-none">Mac Plus - Оформление</h1>

      <div className={`page-content pt-7 pb-10 ${cartList.length > 0 ? 'mb-10' : 'mb-2'}`}>
        <div className="step-by pr-4 pl-4">
          <h3 className="title title-simple title-step"><ALink href="/pages/cart">1. Корзина</ALink></h3>
          <h3 className="title title-simple title-step active"><ALink href="#">2. Оформление</ALink></h3>
          <h3 className="title title-simple title-step"><ALink href="/pages/order">3. Подтверждение</ALink></h3>
        </div>
        <div className="container mt-7">
          {
            cartList.length > 0 ?
              <>
                <form action="#" className="form">
                  <div className="row">
                    <div className="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
                      <h3 className="title title-simple text-left text-uppercase">Детали заказа</h3>
                      <div className="row">
                        <div className="col-xs-6">
                          <label>Имя *</label>
                          <input type="text" className="form-control" name="first-name" required />
                        </div>
                        <div className="col-xs-6">
                          <label>Фамилия *</label>
                          <input type="text" className="form-control" name="last-name" required />
                        </div>
                      </div>
                      {isDelivery ?
                        (
                          delivery[currentRadio].fields.length ? (
                            delivery[currentRadio].fields.map((item, index) => (
                              <div key={item + index}>
                                <label>{item} *</label>
                                <input type="text" className="form-control" name={item} />
                              </div>
                            ))
                          ) : ''
                        )
                        : ''}
                      <div className="row">
                        <div className="col-xs-6">
                          <label>Телефон *</label>
                          <input type="text" className="form-control" name="phone" required />
                        </div>
                        <div className="col-xs-6">
                          <label>Email</label>
                          <input type="text" className="form-control" name="email-address" />
                        </div>
                      </div>
                      <p>Поля, помеченные *, являются обязательными для заполнения.</p>

                      <h2 className="title title-simple text-uppercase text-left mt-6">Комментарий к заказу</h2>
                      <textarea className="form-control pb-2 pt-2 mb-0" cols="30" rows="5"
                        placeholder="Дополнительная информация"></textarea>
                    </div>

                    <aside className="col-lg-5 sticky-sidebar-wrapper">
                      <div className="sticky-sidebar mt-1" data-sticky-options="{'bottom': 50}">
                        <div className="summary pt-5">
                          <h3 className="title title-simple text-left text-uppercase">Ваш заказ</h3>
                          <table className="order-table">
                            <thead>
                              <tr>
                                <th>Товары</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                cartList.map(item =>
                                  <tr key={'checkout-' + item.name}>
                                    <td className="product-name">{item.name} <span
                                      className="product-quantity">×&nbsp;{item.qty}</span></td>
                                    <td className="product-total text-body">{toDecimal(item.price * item.qty)} BYN</td>
                                  </tr>
                                )
                              }

                              <tr className="summary-subtotal">
                                <td>
                                  <h4 className="summary-subtitle">Стоимость</h4>
                                </td>
                                <td className="summary-subtotal-price pb-0 pt-0">{toDecimal(getTotalPrice(cartList))} BYN
                                </td>
                              </tr>
                              <tr className="sumnary-shipping shipping-row-last">
                                <td colSpan="2">
                                  <h4 className="summary-subtitle">Способ доставки</h4>
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
                              <tr className="summary-total">
                                <td className="pb-0">
                                  <h4 className="summary-subtitle">Всего</h4>
                                </td>
                                <td className=" pt-0 pb-0">
                                  <p className="summary-total-price ls-s text-primary">{toDecimal(getTotalPrice(cartList))} BYN</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="payment accordion radio-type">
                            <h4 className="summary-subtitle ls-m pb-3">Метод оплаты</h4>

                            <div className="checkbox-group">
                              {isDelivery ?
                                (delivery[currentRadio].paymentMethods.map((item, index) => (
                                  <div key={item._id}>
                                    <div className="card-header">
                                      <ALink href="#" className={`text-body text-normal ls-m ${index === payment ? 'collapse' : ''}`} onClick={() => { setPayment(index) }}>{item.name}</ALink>
                                    </div>

                                    <Collapse in={index === payment}>
                                      <div className="card-wrapper">
                                        <div className="card-body ls-m overflow-hidden">
                                          {item.description}
                                        </div>
                                      </div>
                                    </Collapse>
                                  </div>
                                ))) : ''}
                            </div>
                          </div>
                          <div className="form-checkbox mt-4 mb-5">
                            <input type="checkbox" className="custom-checkbox" id="terms-condition"
                              name="terms-condition" />
                            <label className="form-control-label" htmlFor="terms-condition">
                              Я прочитал(а) <ALink href="#">правила обработки персональных данных</ALink> и соглашаюсь на обработку персональных данных *
                            </label>
                          </div>
                          <button type="submit" className="btn btn-dark btn-rounded btn-order">Оформить заказ</button>
                        </div>
                      </div>
                    </aside>
                  </div>
                </form>

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
    </main>
  )
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : []
  }
}

export default connect(mapStateToProps)(Checkout);
