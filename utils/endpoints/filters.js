export async function  getFilters(id) {
  const res = await fetch(process.env.API_HOST + `/store/type/filters?${
    id ?
    new URLSearchParams({
      category: id,
    }).toString()
    : ''
  }`);
  return await res.json();
}