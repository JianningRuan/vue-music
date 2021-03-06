require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var axios = require('axios')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var apiRoutes = express.Router()

//获取歌单
apiRoutes.get('/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
//获取mv
apiRoutes.get('/getMVList', function(req, res){
  var url = 'https://c.y.qq.com/v8/fcg-bin/getmv_by_tag';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})
//获取电台
apiRoutes.get('/getRadio', function(req, res){
  var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiolist.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})
//获取 歌手
apiRoutes.get('/getSinger', function(req, res){
  var url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})
//获取歌手详细信息-推荐歌曲
apiRoutes.get('/getSingerRecommend', function (req, res) {
  var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})
//获取歌单详情
apiRoutes.get('/getDiscDetail', function (req, res) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})
//获取排行榜-h5
apiRoutes.get('/getRanking', function(req, res){
  var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})
//获取排行榜详情-h5
apiRoutes.get('/getRankingDetail', function(req, res){
  var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})
//获取歌词
apiRoutes.get('/getLyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})
//获取歌词h5
apiRoutes.get('/getLyricH5', function(req, res){
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e)=>{
    console.log(e)
  })
})
//获取歌单分类目录
apiRoutes.get('/getDiscMuse', function(req, res){
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})
//获取分类的歌单列表
apiRoutes.get('/getDiscList', function(req, res){
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})
//获取电台歌单
apiRoutes.get('/getRadioDisc', function(req, res){
  var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiosonglist.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    var ret = response.data;
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/;
      var matches = ret.match(reg);
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e)=>{
    console.log(e)
  })
})
//搜索
apiRoutes.get('/getSearch', function(req, res){
  var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})

app.use('/api', apiRoutes)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
