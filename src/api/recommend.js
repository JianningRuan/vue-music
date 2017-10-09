import jsonp from './jsonp'
import {commonParam, options} from "./config";
import axios from 'axios'

//轮播图jsonp
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  //合并json
  const data = Object.assign({}, commonParam, {
    uin:0,
    platform:'h5',
    needNewCode:1,
    _:1507202316642
  });

  return jsonp(url, data, options);
}

//歌单jsonp
export function getDiscByTag() {
  //const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
  const url = '/api/getDiscList';
  const data = Object.assign({}, commonParam, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  });

  return axios(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  });
}
