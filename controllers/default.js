exports.install = function() {
	ROUTE('/');
	ROUTE('GET  /{id}    *Url --> @redirect');
};