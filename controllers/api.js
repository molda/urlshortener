exports.install = function() {

	ROUTE('GET      /api/urls/      *Url --> @query');
	ROUTE('POST     /api/urls/      *Url --> @save');
	ROUTE('DELETE   /api/urls/{id}  *Url --> @remove');

};