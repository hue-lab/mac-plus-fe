import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Collapse } from 'react-bootstrap';
import ALink from '~/components/features/custom-link';
import { toDecimal } from '~/utils';
import { getDeliveryMethods } from '~/utils/endpoints/orders';
import { getCalculation } from "~/utils/endpoints/calculate";
import { addOrder } from '~/utils/endpoints/orders';
import {cartActions} from "~/store/cart";

Checkout.getInitialProps = async (context) => {
  const delivery = await getDeliveryMethods();
  return { delivery };
}

function CheckoutButton({ pending, error, terms, removeError }) {
  if (!terms && !error) {
    return <button type="submit" className="btn btn-dark btn-rounded btn-order checkout-button" disabled>Оформить заказ</button>
  } else if (!terms && error) {
    return <button type="submit" className="btn btn-dark btn-rounded btn-order checkout-button" disabled>Попробовать снова</button>
  } else if (terms && !error && !pending) {
    return <button type="submit" className="btn btn-dark btn-rounded btn-order checkout-button">Оформить заказ</button>
  } else if (pending) {
    return <button type="submit" className="btn btn-dark btn-rounded btn-order checkout-button" disabled>Ожидайте</button>
  } else if (error && terms && !pending) {
    return <button type="submit" className="btn btn-dark btn-rounded btn-order checkout-button" onClick={() => removeError(false)}>Попробовать снова</button>
  }
}

function Checkout(props) {
  const { cartList, delivery, updateCart } = props;
  const [currentRadio, setCurrentRadio] = useState(0);
  const [payment, setPayment] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [subTotalPrice, setSubtotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [isTerms, setIsTerms] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [orderError, setOrderError] = useState('');

  const router = useRouter();

  const orderObj = {
    customer: {

    },
    state: {
      label: 'Ожидание',
      color: 'neutral',
      description: 'Ожидайте звонка оператора',
    },
    delivery: {
      deliveryData: [],
    },
    historyList: []
  }

  useEffect(() => {
    const products = cartList.map(item => ({ productId: item._id, count: item.qty }));
    getCalculation(products, delivery[currentRadio]._id).then(res => {
      setDiscount(res?.totalDiscount || 0);
      setSubtotalPrice(res?.orderPrice || 0);
      setTotalPrice(res?.totalPrice || 0);
      setDeliveryPrice(res?.deliveryPrice || 0);
    });
  }, [currentRadio]);

  const radioHandler = (index) => {
    if (delivery[currentRadio].paymentMethods[1] && payment !== 0) {
      setPayment(0);
    }
    setCurrentRadio(index);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = Object.values(form).reduce((obj, field) => { obj[field.name] = field.value; return obj }, {});
    fillOrderObj(formData);
    sendOrderObj();
  }

  const fillOrderObj = (obj) => {
    orderObj.customer.phone = obj.phone.trim();
    orderObj.customer.name = obj.name.trim();
    orderObj.customer.surname = obj.surname.trim();
    orderObj.delivery.deliveryMethod = { ...delivery[currentRadio] };
    orderObj.delivery.deliveryMethod.paymentMethods = delivery[currentRadio].paymentMethods.map(method => method._id);
    orderObj.delivery.deliveryData = [...delivery[currentRadio].fields.map(field => ({ name: field, value: obj[field] }))]
    orderObj.paymentMethod = delivery[currentRadio].paymentMethods[payment];
    orderObj.cartItems = cartList.map(el => ({ productId: el._id, count: el.qty }));
    if (obj.comment) {
      orderObj.delivery.comment = obj.comment.trim();
    }
    if (obj.email) {
      orderObj.customer.email = obj.email.trim();
    }
  }

  const sendOrderObj = async () => {
    setIsPending(true);
    try {
      const res = await addOrder(orderObj);
      if (res.error) {
        throw new Error(res.error)
      }
      router.push(`/pages/order/${res.orderCode}`);
    } catch (e) {
      setOrderError(true);
    } finally {
      setIsPending(false)
      updateCart([]);
    }
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
          <h3 className="title title-simple title-step">3. Подтверждение</h3>
        </div>
        <div className="container mt-7">
          {
            cartList.length > 0 ?
              <>
                <form onSubmit={submitHandler} className="form">
                  <div className="row">
                    <div className="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
                      <h3 className="title title-simple text-left text-uppercase">Детали заказа</h3>
                      <div className="row">
                        <div className="col-xs-6">
                          <label>Имя *</label>
                          <input type="text" className="form-control" name="name" required />
                        </div>
                        <div className="col-xs-6">
                          <label>Фамилия *</label>
                          <input type="text" className="form-control" name="surname" />
                        </div>
                      </div>
                      {
                        delivery[currentRadio].fields.length ? (
                          delivery[currentRadio].fields.map((item, index) => (
                            <div key={item + index}>
                              <label>{item} *</label>
                              <input type="text" className="form-control" name={item} required />
                            </div>
                          ))
                        ) : ''
                      }
                      <div className="row">
                        <div className="col-xs-6">
                          <label>Телефон *</label>
                          <input type="text" className="form-control" name="phone" required />
                        </div>
                        <div className="col-xs-6">
                          <label>Email</label>
                          <input type="text" className="form-control" name="email" />
                        </div>
                      </div>
                      <p>Поля, помеченные *, являются обязательными для заполнения.</p>

                      <h2 className="title title-simple text-uppercase text-left mt-6">Комментарий к заказу</h2>
                      <textarea className="form-control pb-2 pt-2 mb-0" cols="30" rows="5"
                        name="comment" placeholder="Дополнительная информация"></textarea>
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
                                <td className="summary-subtotal-price pb-0 pt-0">{toDecimal(subTotalPrice)} BYN
                                </td>
                              </tr>
                              <tr className="summary-subtotal">
                                <td>
                                  <h4 className="summary-subtitle">Скидка</h4>
                                </td>
                                <td className="summary-subtotal-price pb-0 pt-0">{toDecimal(discount)} BYN
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
                              {deliveryPrice ? (<tr className="summary-total">
                                <td className="pb-0">
                                  <h4 className="summary-subtitle">Стоимость доставки</h4>
                                </td>
                                <td className=" pt-0 pb-0">
                                  <p className="summary-subtotal-price pb-0 pt-0">{toDecimal(deliveryPrice)} BYN</p>
                                </td>
                              </tr>) : (<></>)}
                              <tr className="summary-total">
                                <td className="pb-0">
                                  <h4 className="summary-subtitle">Всего</h4>
                                </td>
                                <td className=" pt-0 pb-0">
                                  <p className="summary-total-price ls-s text-primary">{toDecimal(totalPrice)} BYN</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="payment accordion radio-type">
                            <h4 className="summary-subtitle ls-m pb-3">Метод оплаты</h4>

                            <div className="checkbox-group">
                              {delivery[currentRadio].paymentMethods.map((item, index) => {
                                return (
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
                                )
                              })}
                            </div>
                          </div>
                          <div className="form-checkbox mt-4 mb-5">
                            <input type="checkbox" className="custom-checkbox" id="terms-condition"
                              name="terms-condition" onChange={e => setIsTerms(!isTerms)} required />
                            <label className="form-control-label" htmlFor="terms-condition">
                              Я прочитал(а) <ALink href="#"><u>правила обработки персональных данных</u></ALink> и соглашаюсь на обработку персональных данных *
                            </label>
                          </div>
                          {orderError && !isPending ? (
                            <p className='checkout-error-message'>
                              Произошла ошибка при отправке данных на сервер. Пожалуйста, перепроверьте введённые данные и попробуйте ещё раз.
                            </p>
                          ) : ''}
                          <CheckoutButton pending={isPending} error={orderError} terms={isTerms} removeError={setOrderError} />
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

export default connect(mapStateToProps, { updateCart: cartActions.updateCart })(Checkout);
