NEWSCHEMA('Url', function(schema) {

	schema.define('id', 'String');
	schema.define('url', 'String', true);
	schema.define('dt', 'Date');

	schema.setQuery(function($) {

		var db = TABLE('urls');

		db.listing().sort('dt', true).callback(function(err, data){
			if (err)
				$.callback([]);
			else
				$.callback(data);
		});
	});

	schema.setSave(function($) {

		var data = { id: uid(), url: $.model.url, dt: Date.now() };

		TABLE('urls').insert(data);

		$.success(true, data);
	});

	schema.setRemove(function($) {

		TABLE('urls').remove().where('id', $.id).callback(function(err, data){
			$.success(err ? false : true);
		});
	});


	schema.addWorkflow('redirect', function($) {

		var db = TABLE('urls');

		db.find().where('id', $.id).callback(function(err, data){

			if (err || !data.length)
				$.controller.redirect('/?notfound=' + $.id);
			else
				$.controller.redirect(data[0].url);
		});
	});
});

var chars = 'QEth2f9xkdaW0M5Dy1mjgRu4XIn8NTKApUvYPGbSelZczLiOB73FwVHqrJCs6o';

function uid() {
	var char = "";
	for (let i = 0; i < 6; i += 1) {
		char += chars[rnd(0, 61)];
	}
	return char;
}

function rnd(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}