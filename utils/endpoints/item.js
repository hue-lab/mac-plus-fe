export async function getItemBySlug(slug) {
  const res = await fetch(process.env.API_HOST + `/store/item?slug=${slug}`);
  return await res.json();
}