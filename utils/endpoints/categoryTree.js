export async function getCategoryTree() {
  const res = await fetch(process.env.API_HOST + '/store/category/tree');
  return await res.json() || [];
}