import { getLyric, getLyricH5 } from './../../api/recommend';
import { Base64 } from 'js-base64'

//添加class名
export function addClass(el, className) {
  let isHasClass = hasClass(el, className);
  if (!isHasClass){
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
  }
}

export function hasClass(el, className) {
  return (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1;
}

export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val){
    return el.setAttribute(name, val)
  }else {
    return el.getAttribute(name)
  }
}

//创建歌手资料
export class singer {
  constructor({id, mid, name}){
    this.id = id;
    this.mid = mid;
    this.name = name;
    this.headPic = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${mid}.jpg?max_age=2592000`
  }
}

//创建歌曲资料
export class song {
  constructor({index, isNew, albumMid, albumName, songId, songMid, songName, singer,interval, image, url}){
    this.index = index;
    this.isNew = isNew;
    this.albumMid = albumMid;
    this.albumName = albumName;
    this.songId = songId;
    this.songMid = songMid;
    this.songName = songName;
    this.singer = singer;
    this.interval = interval;
    this.image = image;
    this.url = url
  }

  getSongLyricH5(){
    if (this.lyric){
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject)=>{
      getLyricH5(this.songId).then((res)=>{
        if (res.code === 0){
          this.lyric = Base64.decode(res.lyric);
          resolve(this.lyric)
        }else {
          reject('no lyric')
        }
      })
    })
  }
}

export function crateSongList(songDate){
  let songList = [];
  songDate.forEach((val, index)=>{
    let singer = [];
    val.musicData.singer.forEach((val)=>{
      singer.push(val.name)
    });

    songList.push(new song({
      index: val.index,
      isNew: val.isnew,
      albumMid: val.musicData.albummid,
      albumName: val.musicData.albumname,
      songId: val.musicData.songid,
      songMid: val.musicData.songmid,
      songName: val.musicData.songname,
      singer: singer.join(' '),
      interval: val.musicData.interval,
      image: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${val.musicData.albummid}.jpg?max_age=2592000`,
      url: `http://ws.stream.qqmusic.qq.com/${val.musicData.songid}.m4a?fromtag=46`
    }))
  });
  return songList
}

export function createDiscSongList(songData){
  console.log(songData)
  let songList = [];
  songData.forEach((val, index)=>{
    let singer = [];
    val.singer.forEach((val)=>{
      singer.push(val.name)
    });
    songList.push(new song({
      index: index,
      isNew: val.isnew,
      albumMid: val.albummid,
      albumName: val.albumname,
      songId: val.songid,
      songMid: val.songmid,
      songName: val.songname,
      singer: singer.join(' '),
      interval: val.interval,
      image: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${val.albummid}.jpg?max_age=2592000`,  //https://y.gtimg.cn/music/photo_new/T002R300x300M000001ZaCQY2OxVMg.jpg?max_age=2592000
      url: `http://ws.stream.qqmusic.qq.com/${val.songid}.m4a?fromtag=46`
    }))
  });
  return songList
}

export function createRankSongList(songData){
  let songList = [];
  songData.forEach((val, index)=>{
    let singer = [];
    val.data.singer.forEach((val)=>{
      singer.push(val.name)
    });
    songList.push(new song({
      index: index,
      isNew: 0,
      albumMid: val.data.albummid,
      albumName: val.data.albumname,
      songId: val.data.songid,
      songMid: val.data.songmid,
      songName: val.data.songname,
      singer: singer.join(' '),
      interval: val.data.interval,
      image: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${val.data.albummid}.jpg?max_age=2592000`,  //https://y.gtimg.cn/music/photo_new/T002R300x300M000001ZaCQY2OxVMg.jpg?max_age=2592000
      url: `http://ws.stream.qqmusic.qq.com/${val.data.songid}.m4a?fromtag=46`
    }))
  });
  return songList
}

export function createRadioSongList(songData){
  let songList = [];
  songData.forEach((val, index)=>{
    let singer = [];
    val.singer.forEach((val)=>{
      singer.push(val.name)
    });
    songList.push(new song({
      index: index,
      isNew: 0,
      albumMid: val.album.mid,
      albumName: val.album.name,
      songId: val.id,
      songMid: val.mid,
      songName: val.name,
      singer: singer.join(' '),
      interval: val.interval,
      image: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${val.album.mid}.jpg?max_age=2592000`,  //https://y.gtimg.cn/music/photo_new/T002R300x300M000001ZaCQY2OxVMg.jpg?max_age=2592000
      url: `http://ws.stream.qqmusic.qq.com/${val.id}.m4a?fromtag=46`
    }))
  });
  return songList
}

//制造随机
function getRandomInit(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}
//随机队列
export function randomArray(arr){
  let _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInit(0, i);
    let t = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = t
  }
  return _arr
}

//返回rListView所需数据
export function crateRadioList(radioData){
  let radioList = [];
  radioData.forEach((val, index)=>{
    let radio = {};
    radio.name = val.name;
    radio.type = val.type;
    radio.list = [];
    val.radioList.forEach((cVal, cIndex)=>{
      let cRadio = {};
      cRadio.num = cVal.listenNum;
      cRadio.name = cVal.radioName;
      cRadio.pic = cVal.radioImg;
      cRadio.id = cVal.radioId;
      radio.list.push(cRadio);
    })
    radioList.push(radio);
  })
  return radioList;
  /*
   [ {name: '', type: 1, list: [ {name: '', id: 1, num: 1, pic: ''}, {name: '', id: 2, num: 1, pic: ''} ] } ]
   */
}

//
let elementStyle = document.createElement('div').style;

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})();

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
