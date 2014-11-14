exports.definition = {
	config: {
		columns: {
		    "id": "TEXT", //cagis location guid
		    "DESCRIPTION": "TEXT",
		    "JURIS":"TEXT",
		    "json_obj": "blob"
		},
		adapter: {
			type: "sql",
			collection_name: "LocationMRU",
			idAttribute:'id'
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
            // Implement the comparator method.
    	    comparator : function(storedLocation) {
        	    return storedLocation.get('JURIS');
            }			
		});

		return Collection;
	}
};