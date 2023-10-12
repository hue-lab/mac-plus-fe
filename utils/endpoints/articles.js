export async function getArticles(page = 1) {
  const res = await fetch(process.env.API_HOST + `/article?page=${page}`);
  return await res.json() || [];
}

export async function getLatestArticles(limit = 4) {
  const res = await fetch(process.env.API_HOST + `/article?limit=${limit}`);
  return await res.json() || [];
}

export async function getArticleById(id) {
  const res = await fetch(process.env.API_HOST + '/article/' + id);
  return await res.json() || [];
}