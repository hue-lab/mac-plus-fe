export async function getDeliveryMethods() {
  const res = await fetch(process.env.API_HOST + '/store/delivery-method');
  return res.json() || [];
}

export async function getPaymentMethods() {
  const res = await fetch(process.env.API_HOST + '/store/payment-method');
  return res.json() || [];
}