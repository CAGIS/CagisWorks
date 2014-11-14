var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "TEXT",
            FirstName: "TEXT",
            LastName: "TEXT",
            Phone: "TEXT",
            Email: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "contactInformation",
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
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

model = Alloy.M("contactInformation", exports.definition, []);

collection = Alloy.C("contactInformation", exports.definition, model);

exports.Model = model;

exports.Collection = collection;