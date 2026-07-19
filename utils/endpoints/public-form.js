export async function getPublicFormToken(action) {
  const res = await fetch(
    process.env.API_HOST + `/security/public-form-token/${action}`,
  );

  if (!res.ok) {
    await throwPublicFormError(res, 'Cannot get form token');
  }

  const data = await res.json();
  return data.token;
}

export async function throwPublicFormError(res, fallbackMessage) {
  const data = await res.json().catch(() => ({}));
  const reason = data?.reason || data?.error;
  const error = new Error(data?.message || fallbackMessage);

  error.status = res.status;
  error.reason = reason;
  error.payload = data;

  throw error;
}

export function getPublicFormErrorMessage(error) {
  if (error?.status === 429 || error?.reason === 'rate-limit') {
    return 'Слишком много запросов. Пожалуйста, попробуйте позже. Если заказ срочный, свяжитесь с нами по телефону или через страницу контактов.';
  }

  if (error?.reason === 'captcha') {
    return 'Не удалось пройти проверку безопасности. Отключите VPN или блокировщик, попробуйте другой браузер либо свяжитесь с нами по телефону или через страницу контактов, чтобы оформить заказ вручную.';
  }

  if (error?.reason === 'token') {
    return 'Форма устарела. Пожалуйста, попробуйте отправить ещё раз.';
  }

  if (error?.reason === 'origin') {
    return 'Не удалось подтвердить источник формы. Обновите страницу и попробуйте снова.';
  }

  if (error?.reason === 'honeypot') {
    return 'Заявка отклонена. Проверьте форму и попробуйте снова.';
  }

  return 'Произошла ошибка при отправке. Проверьте данные и попробуйте ещё раз.';
}
