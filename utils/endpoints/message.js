async function getPublicFormToken(action) {
  const res = await fetch(process.env.API_HOST + `/security/public-form-token/${action}`);

  if (!res.ok) {
    throw new Error('Cannot get form token');
  }

  const data = await res.json();
  return data.token;
}

export async function sendMessage({name, phone, message, website = '', turnstileToken}) {
  const formToken = await getPublicFormToken('quick-message');
  const res = await fetch(process.env.API_HOST + '/notify/message', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name, phone, message, website, turnstileToken, formToken}),
  });

  if (!res.ok) {
    throw new Error('Cannot send message');
  }

  return res;
}
