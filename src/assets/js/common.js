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
  constructor({index, isNew, albumMid, albumName, songMid, songName, singer,interval, image, url}){
    this.index = index;
    this.isNew = isNew;
    this.albumMid = albumMid;
    this.albumName = albumName;
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
      songMid: val.musicData.songmid,
      songName: val.musicData.songname,
      singer: singer.join(' '),
      interval: val.musicData.interval,
      image: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${val.musicData.songmid}.jpg?max_age=2592000`,
      url: 'http://dl.stream.qqmusic.qq.com/C400003OUlho2HcRHC.m4a?vkey=11AA750B533B961727C635F483370296CC8F93E372380569A10B5AE1421F142CC83F5FA9AD84E6FEC7A93ACBE8E652008528CCFF0B22645F&guid=4467252985&uin=0&fromtag=66'
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
      songMid: val.songmid,
      songName: val.songname,
      singer: singer.join(' '),
      interval: val.interval,
      image: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${val.songmid}.jpg?max_age=2592000`,
      url: 'http://dl.stream.qqmusic.qq.com/C400003OUlho2HcRHC.m4a?vkey=11AA750B533B961727C635F483370296CC8F93E372380569A10B5AE1421F142CC83F5FA9AD84E6FEC7A93ACBE8E652008528CCFF0B22645F&guid=4467252985&uin=0&fromtag=66'
    }))
  })

  return songList
}
