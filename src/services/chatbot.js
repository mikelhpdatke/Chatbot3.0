// import { stringify } from 'qs';
import request from '@/utils/request';
import { post } from '@/utils/httpRequest';

export async function getChatbots(params) {
  // return request('http://34.73.92.252:3000/chatbots/getfullinfo', {
  //   method: 'POST',
  //   body: new FormData({ ...params })
  // });
  return post('http://34.73.92.252:3000/chatbots/getfullinfo', params);
}

export async function getRecentlyAIML(params) {
  return post('http://34.73.92.252:3000/aimlquestions', params);
}
