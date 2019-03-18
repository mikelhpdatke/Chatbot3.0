// import { stringify } from 'qs';
// import request from '@/utils/request';
import { post, PostAppJson } from '@/utils/httpRequest';
import { ipServer } from '@/utils/utils';

export async function getChatbots(params) {
  // return request('http://34.73.92.252:3000/chatbots/getfullinfo', {
  //   method: 'POST',
  //   body: new FormData({ ...params })
  // });
  return PostAppJson(`${ipServer  }api/chatbot/list`, params);
}

export async function getTopics(params) {
  return post(`${ipServer  }api/chatbot/topic/list`, params);
}

export async function getRecentlyAIML(params) {
  return post('http://34.73.92.252:3000/aimlquestions', params);
}
