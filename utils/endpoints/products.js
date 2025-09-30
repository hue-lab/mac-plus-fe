export async function getRecProducts(limit = 6) {
  const res = await fetch(process.env.API_HOST + '/store/products', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
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
  let data = await res.json();
  if (data?.data?.length) {
    data.data.forEach((product) => {
      delete product.description
      delete product.brand.description
      delete product.media
      delete product.categoryId
    })
  }
  return data;
}

export async function getProductsAdvanced(category, id, limit = 6) {
  const res = await fetch(process.env.API_HOST + '/store/products', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "preview": true,
      "pagination": {
        "page": 1,
        "limit": limit,
      },
      "baseProperties": {
        "categoryId": {
          "$eq": category
        },
        "_id": {
          "$ne": id
        }
      }
    })
  });
  let data = await res.json();
  if (data?.data?.length) {
    data.data.forEach((product) => {
      delete product.description
      delete product.brand.description
      delete product.categoryId
    })
  }
  return data;
}

export async function getProducts(body) {
  const payload = {
    ...(body || {}),
    hideDisabledCategories: true,
  }
  const res = await fetch(process.env.API_HOST + '/store/products', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return await res.json();
}

export async function getProductById(id) {
  const res = await fetch(process.env.API_HOST + `/store/product/${id}`);
  return await res.json();
}
