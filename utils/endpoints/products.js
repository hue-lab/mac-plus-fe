export async function getRecProducts(limit = 4) {
  const res = await fetch(process.env.API_HOST + '/store/products', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      preview: true,
      pagination: {
        page: 1,
        limit,
      },
      baseProperties: {
        isRec: {
          $eq: true,
        }
      },
    })
  });
  return await res.json();
}

export async function getProducts(body) {
  const res = await fetch(process.env.API_HOST + '/store/products', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  });
  return await res.json();
}

export async function getProductById(id) {
  const res = await fetch(process.env.API_HOST + `/store/product/${id}`);
  return await res.json();
}