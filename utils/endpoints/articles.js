export async function getArticles() {
  const res = await fetch(process.env.API_HOST + '/article?preview=true');
  return await res.json() || [];
}

export async function getArticleById(id) {
  const res = await fetch(process.env.API_HOST + '/article/' + id);
  return await res.json() || [];
}