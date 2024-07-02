export async function getFieldsObject(...fieldStrings) {
  const res = await fetch(process.env.API_HOST + '/field/object?code=' + fieldStrings.join(','));
  return res?.json() || {};
}