import { getPublicFormToken, throwPublicFormError } from './public-form';

export async function sendMessage({name, phone, message, website = '', turnstileToken}) {
  const formToken = await getPublicFormToken('quick-message');
  const res = await fetch(process.env.API_HOST + '/notify/message', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name, phone, message, website, turnstileToken, formToken}),
  });

  if (!res.ok) {
    await throwPublicFormError(res, 'Cannot send message');
  }

  return res;
}
