import { fetchJson } from './fetch-json';

export async function getItemBySlug(slug) {
  return fetchJson(process.env.API_HOST + `/store/item?${new URLSearchParams({ slug })}`, {
    acceptedStatuses: [404],
  });
}
