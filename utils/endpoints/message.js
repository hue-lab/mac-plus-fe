export async function sendMessage({name, email, message}) {
  return await fetch(process.env.API_HOST + '/notify/message', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name, email, message}),
  });
}