export async function getCalculation(products = [], deliveryMethod = undefined) {
  const res = await fetch(process.env.API_HOST + `/calculation/discount`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      products,
      deliveryMethod,
    })
  });
  return await res.json();
}