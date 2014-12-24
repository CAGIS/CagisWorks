exports.definition = {
	config: {
		columns: {
			"id":"TEXT",
		    "FirstName": "TEXT",
		    "LastName": "TEXT",
		    "Phone": "TEXT",
		    "Email": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "contactInformation",
			idAttribute:"id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			idAttribute:'id'
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};