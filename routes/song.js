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
			request.get(urljoin(api_endpoint, "list"), (err, r, listBody) => {
				var lo = JSON.parse(listBody);
				var all = [];
				if (lo.ok) {
					var reg = /^(XEL|ARG)_(\d{3})([A-Z])?(?:v(\d))?$/;
					var myNum = new Number(reg.exec(id)[2]);
					all = lo.music.filter((item,index) => {
						var num = new Number(reg.exec(item.display_id)[2]);
						return myNum - 3 <= num && num <= myNum + 3;
					});
				}
				res.render("song", {song: o.music, url: o.music_url, relatives: relatives, all: all, title: `${o.music.title} - Xeltica Musica`, description: o.music.description});
			});
		});
	});
});

module.exports = router;
