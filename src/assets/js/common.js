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
    this.id = id
    this.mid = mid
    this.name = name
    this.headPic = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${mid}.jpg?max_age=2592000`
  }

}
