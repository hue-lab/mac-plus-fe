export async function getMenuByCode(code) {
  const res = await fetch(process.env.API_HOST + '/store/menu/' + code);
  return res.json() || [];
}