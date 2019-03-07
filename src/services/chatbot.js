// import { stringify } from 'qs';
import request from '@/utils/request';


export async function PostApiForm(url, json) {
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
  // console.log(json);
  // console.log(myRequest.body);
  const result = fetch(myRequest)
    .then(response => {
      // console.log('in resssss');
      // console.log(response);
      if (response.status === 200) {
        // console.log('??clgttt');
        // console.log(response.text());
        return response.json();
      }
      console.log('err');
      return false;
      // return Promise.reject(new Error('err status != 200'));
      // console.log('Something went wrong on api server!');
    })
    .then(response => response);
  // .catch(error => {
  //   console.log(`Stm went wronggggg${error}`);
  // });
  return result;
}


export async function getChatbots(params) {
  // return request('http://34.73.92.252:3000/chatbots/getfullinfo', {
  //   method: 'POST',
  //   body: new FormData({ ...params })
  // });
  return PostApiForm('http://34.73.92.252:3000/chatbots/getfullinfo', params);
}

export async function getRecentlyAIML(params) {
  return PostApiForm('http://34.73.92.252:3000/aimlquestions/listquestions', params);
}
