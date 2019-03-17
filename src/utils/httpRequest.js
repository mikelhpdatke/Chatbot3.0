/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line import/prefer-default-export
export async function post(url, json) {
  let formBody = [];
  for (const property in json) {
    if (Object.prototype.hasOwnProperty.call(json, property)) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(json[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
  }
  formBody = formBody.join('&');
  const myRequest = new Request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBody,
  });
  const result = fetch(myRequest)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(response);
      // console.log('err');
      // return false;
    })
    .then(response => response);
  return result;
}
