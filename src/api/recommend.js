import jsonp from './jsonp'
import {commonParam, options, homeDataParam} from "./config";
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
export function getDiscByTag(num = 17) {
  //const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
  const url = '/api/getDiscList';
  const data = Object.assign({}, commonParam, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: num, //从0开始，获取多少个
    sortId: 0,
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

//歌单详细
export function getDiscDetail(disstId){
  const url = '/api/getDiscDetail';
  const data = Object.assign({}, commonParam, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: disstId,
    g_tk: 5381,
    jsonCallback: 'playlistinfoCallback',
    loginUin: 0,
    hostUin: 0,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return axios(url, {
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

//排行榜h5
export function getRanking(){
  const  url = '/api/getRanking';
  const data = Object.assign({}, commonParam, {
    g_tk: 5381,
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    _: 1508749457240
  })
  return axios(url, {
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

//排行榜详情h5
export function getRankingDetail(topId){
  const url = '/api/getRankingDetail';
  const data = Object.assign({}, commonParam, {
    g_tk: 5381,
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid: topId,
    _: 1508751231431
  })
  return axios(url, {
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

//歌词
export function getLyric(mid) {
  const url = '/api/getLyric';
  const data = Object.assign({}, commonParam, {
    //callback:'MusicJsonCallback_lrc',
    pcachetime: +new Date(),
    songmid: mid,
    //jsonCallback: 'MusicJsonCallback_lrc',
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    format:'json',
    needNewCode:0
  })
  return axios(url, {
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

//歌词h5
export function getLyricH5(id){
  const url = '/api/getLyricH5';
  const data = Object.assign({}, commonParam, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    nobase64: 0,
    musicid: id,
    songtype: 0,
    _: 1510018061737,
    jsonpCallback: 'json'
  })
  return axios(url, {
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

//歌单分类目录
export function getDiscMuse(){
  const url = '/api/getDiscMuse';
  const data = Object.assign({}, commonParam, {
    jsonCallback: 'getPlaylistTags',
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

//分类的歌单列表
export function getDiscList(categoryId){
  const url = '/api/getDiscList';
  const data = Object.assign({}, commonParam, {
    picmid: 1,
    rnd: Math.random(),
    jsonCallback: 'getPlaylist',
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 11,
    sortId: categoryId,
    sin: 0,
    ein: 29
  })
  return axios(url, {
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

