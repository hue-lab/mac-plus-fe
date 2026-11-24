import { fetchJson } from './fetch-json';

export async function getSeoByUrl(url) {
  try {
    return (await fetchJson(process.env.API_HOST + `/seo/item?${new URLSearchParams({url})}`)) || null;
  } catch (e) {
    return null;
  }
}
