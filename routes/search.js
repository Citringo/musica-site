var express = require('express');
var request = require("request");
var urljoin = require("url-join");
var router = express.Router();

const api_endpoint = "https://api.citringo.net/musica/v1/";

/* GET home page. */
router.get('/', (req, res, next) => {
	if (!req.query.keyword) {
		// トップに飛ばす
		res.redirect("/");
		return;
	}
	request.get({
	url: urljoin(api_endpoint, "search"),
	qs: { keyword: req.query.keyword }}, (err, r, body) => {
		var o = JSON.parse(body);
		o.keyword = req.query.keyword;
		o.title = `${o.keyword} の検索結果 - Xeltica Musica`;
		if (!o.ok) {
			res.render("search", o);
			return;
		}

		res.render("search", o);
	});
});

module.exports = router;
