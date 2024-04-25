export async function getSeoByUrl(url) {
  try {
    const res = await fetch(process.env.API_HOST + `/seo/item?url=${url}`);
    return (await res.json()) || null;
  } catch (e) {
    return null;
  }
}

export async function getAllSeo() {
  try {
    const res = await fetch(process.env.API_HOST + `/seo`);
    return (await res.json()) || null;
  } catch (e) {
    return null;
  }
}