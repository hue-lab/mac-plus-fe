export async function autocomplete(str) {
  const res = await fetch(process.env.API_HOST + '/store/autocomplete/' + str);
  return await res.json() || [];
}