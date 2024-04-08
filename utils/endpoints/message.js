export async function sendMessage({name, phone, message}) {
  return await fetch(process.env.API_HOST + '/notify/message', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name, phone, message}),
  });
}