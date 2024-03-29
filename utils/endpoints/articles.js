export async function getArticles(page = 1, limit = 8) {
  const queryParams = new URLSearchParams({
    page,
    limit,
    hidden: false,
  }).toString();
  const res = await fetch(process.env.API_HOST + `/article?${queryParams}`);
  return (await res.json()) || [];
}

export async function getLatestArticles(limit = 4) {
  const res = await fetch(process.env.API_HOST + `/article?limit=${limit}&hidden=false`);
  return (await res.json()) || [];
}

export async function getArticleById(id) {
  const res = await fetch(process.env.API_HOST + "/article/" + id);
  return (await res.json()) || [];
}

export async function getArticleBySlug(slug) {
  const res = await fetch(process.env.API_HOST + `/article/item?slug=${slug}`);
  return (await res.json()) || [];
}
