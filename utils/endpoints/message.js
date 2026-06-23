export async function sendMessage({name, phone, message, website = '', turnstileToken}) {
  const res = await fetch(process.env.API_HOST + '/notify/message', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name, phone, message, website, turnstileToken}),
  });

  if (!res.ok) {
    throw new Error('Cannot send message');
  }

  return res;
}
