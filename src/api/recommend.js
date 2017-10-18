import jsonp from './jsonp'
import {commonParam, options} from "./config";
import axios from 'axios'

//轮播图 jsonp
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

//歌单 jsonp
export function getDiscByTag(num = 5) {
  //const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
  const url = '/api/getDiscList';
  const data = Object.assign({}, commonParam, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 5, //从0开始，获取多少个
    sortId: num,
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

//MV jsonp
export function getMVList(){
  const url = '/api/getMVList';
  const data = Object.assign({}, commonParam, {
    jsonpCallback: 'MusicJsonCallback4902539406095505',
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode:0,
    cmd: 'shoubo',
    lan: 'all'
  });
  return axios(url, {
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data);
  })
}

//电台 jsonp
export function getRadioList(){
  const url = '/api/getRadio';
  const data = Object.assign({}, commonParam, {
    channel: 'radio',
    page: 'index',
    tpl: 'wk',
    new: 1,
    p: Math.random(),
    g_tk: 5381,
    jsonpCallback: 'MusicJsonCallback5037345305510446',
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return axios(url, {
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

//歌手 jsonp
export function getSinger() {
  const url = '/api/getSinger';
  const data = Object.assign({}, commonParam, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    jsonCallback: 'GetSingerListCallback',
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode:0
  })
  return axios(url, {
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

//歌手详细信息-推荐歌曲
export function getSingerRecommend(mid) {
  const url = '/api/getSingerRecommend';
  const data = Object.assign({}, commonParam, {
    jsonCallback: 'MusicJsonCallbacksinger_track',
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: mid,
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1
  })
  return axios(url, {
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}
