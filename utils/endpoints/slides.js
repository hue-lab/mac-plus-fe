export async function getSlides() {
  const res = await fetch(process.env.API_HOST + '/article?' + new URLSearchParams({
    tags: ['slider']
  }));
  return await res.json() || [];
}