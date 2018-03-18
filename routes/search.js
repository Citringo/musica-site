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
	request.get(urljoin(api_endpoint, "search"), { form: req.query }, (err, r, body) => {
		var o = JSON.parse(body);
		o.keyword = req.query.keyword;
		if (!o.ok) {
			res.render("search", o);
			return;
		}

		res.render("search", o);
	});
});

module.exports = router;
