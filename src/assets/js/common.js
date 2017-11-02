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
  })
  return songList
}

export function createDiscSongList(songDate){
  let songList = [];
  songDate.forEach((val, index)=>{
    let singer = [];
    val.singer.forEach((val)=>{
      singer.push(val.name)
    })
    songList.push(new song({
      index: val.index,
      isNew: val.isnew,
      albumMid: val.albummid,
      albumName: val.albumname,
      songId: val.songid,
      songMid: val.songmid,
      songName: val.songname,
      singer: singer.join(' '),
      interval: val.interval,
      image: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${val.albummid}.jpg?max_age=2592000`,  //https://y.gtimg.cn/music/photo_new/T002R300x300M000001ZaCQY2OxVMg.jpg?max_age=2592000
      url: `http://ws.stream.qqmusic.qq.com/${val.songId}.m4a?fromtag=46`
    }))
  })
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
