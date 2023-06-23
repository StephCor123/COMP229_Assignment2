module.exports = function(mongoose) {
    var schema = mongoose.Schema({
      name: String,
    });
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    var Category = mongoose.model("Category", schema);
    return Category;
  };
  