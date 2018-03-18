$('.ui.search').search({
	apiSettings: {
		url: 'https://api.citringo.net/musica/v1/search?keyword={query}',
		onResponse: (res) => {
			var retobj = {results: []};
			// API に失敗したら空っぽで返す
			if (!res.ok) {
				retobj.results[0] = {title: "見つかりませんでした", description: "他のキーワードを試してみてください．", url: ""};
				return retobj;
			}
			res.music.forEach(m => {
				retobj.results.push({
					title: m.title,
					description: m.description,
					url: "/song/" + m.display_id,
				});
			});

			retobj.action = {url: "/search?keyword=" + encodeURI($("input[name='keyword']").val()), text: `${res.music.length} 件の全結果を見る`};
			
		  return retobj;
	  }
	},
	minCharacters : 1
});