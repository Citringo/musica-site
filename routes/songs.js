var express = require('express');
var request = require("request");
var urljoin = require("url-join");
var router = express.Router();

const api_endpoint = "https://api.citringo.net/musica/v1/";

/* GET home page. */
router.get('/:id', (req, res, next) => {
  request.get(urljoin(api_endpoint + id), (err, r, body) => {
    if (err || r.statusCode == 404) {
      res.statusCode(404);
      res.render("error", {message: "データを取得できませんでした．しばらくしてから再度読み込んでください．", developer_message: "Couldn't connect to list API"});
      return;
    }
    else if (err)
    {
      res.statusCode(404);
      res.render("error", {message: "データを取得できませんでした．しばらくしてから再度読み込んでください．", developer_message: `${r.statusCode} ${r.statusMessage}`});
      return;
    }
    res.render("index", JSON.parse(body));
  });
});

module.exports = router;
