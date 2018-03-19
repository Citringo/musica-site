var express = require('express');
var request = require("request");
var urljoin = require("url-join");
var router = express.Router();

const api_endpoint = "https://api.citringo.net/musica/v1/";

/* GET home page. */
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  request.get(urljoin(api_endpoint, id), (err, r, body) => {
    var o = JSON.parse(body);
    if (!o.ok) {
      res.status(404);
      res.render("error", {message: `楽曲 '${id}' は見つかりませんでした．`, developer_message: o.error});
      return;
    }
    request.get(urljoin(api_endpoint, "relative", id), (err, r, relativeBody) => {
      var ro = JSON.parse(relativeBody);
      var relatives = [];
      if (ro.ok) {
        relatives = ro.music;
      }
      res.render("song", {song: o.music, url: o.music_url, relatives: relatives, title: `${o.music.title} - Xeltica Musica`, description: o.music.description});
    });
  });
});

module.exports = router;
