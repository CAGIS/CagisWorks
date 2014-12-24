var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "TEXT",
            DESCRIPTION: "TEXT",
            JURIS: "TEXT",
            json_obj: "blob"
        },
        adapter: {
            type: "sql",
            collection_name: "LocationMRU",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            idAttribute: "id"
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            comparator: function(storedLocation) {
                return storedLocation.get("JURIS");
            }
        });
        return Collection;
    }
};

model = Alloy.M("LocationMRU", exports.definition, []);

collection = Alloy.C("LocationMRU", exports.definition, model);

exports.Model = model;

exports.Collection = collection;