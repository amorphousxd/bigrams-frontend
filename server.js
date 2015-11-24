var express = require('express');
var port = 3001;
var app = express();
var cors = require('cors');

var nouns = [
	{
		word: 'Мама',
		count: 10871
	},
];
var nounForms = [
	{
		word: 'Мама',
		count: 8100
	},
	{
		word: 'Мамy',
		count: 1000
	},
	{
		word: 'Мамы',
		count: 450
	},
	{
		word: 'Мамами',
		count: 450
	},
];
var forms = {
	'N': nounForms
};
var adjectives = [
	{
		word: 'Милый',
		count: 900
	},
	{
		word: 'Красивый',
		count: 1200
	},
	{
		word: 'Добрый',
		count: 811
	},
	{
		word: 'Трудолюбивый',
		count: 617
	},
];

// app.get("/:string", cors(), function(req, res) {
// 	console.log(req.query);
//   res.json({
// 		value: 'You now got ' + req.params.string
// 	})
// });

app.get("/results", cors(), function(req, res) {
	var results = {
		N: nouns,
		ADJ: adjectives,
	};
	//if(req.query.checked) {
		// for(var i = 0; i < checked.req.query.checked.length; i++){
		// 	results.push(forms[req.query.checked[i]]);
		// }
	//}
  res.json(results);
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
