export async function getDeliveryMethods() {
  const res = await fetch(process.env.API_HOST + '/store/delivery-method');
  return res.json() || [];
}

export async function getPaymentMethods() {
  const res = await fetch(process.env.API_HOST + '/store/payment-method');
  return res.json() || [];
}

async function getPublicFormToken(action) {
  const res = await fetch(process.env.API_HOST + `/security/public-form-token/${action}`);

  if (!res.ok) {
    throw new Error('Cannot get form token');
  }

  const data = await res.json();
  return data.token;
}

export async function addOrder(obj) {
  const formToken = await getPublicFormToken('order');
  const res = await fetch(process.env.API_HOST + '/store/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {...obj, formToken}
    )
  })
  return await res.json();
}

export async function getOrderByCode(code) {
  const res = await fetch(process.env.API_HOST + '/store/order/tracking/' + code);
  return res.json() || {};
}
