module.exports = app => {
    const Category = require("../controllers/category.controllers");
    var router = require("express").Router();

    // Create a new Product
    router.post("/", Category.create);
  
    // Retrieve all Products
    router.get("/", Category.findAll);
  
    // Retrieve all published Products
    router.get("/published", Category.findAllPublished);
  
    // Retrieve a single Product with id
    router.get("/:id", Category.findOne);
  
    // Update a Product with id
    router.put("/:id", Category.update);
  
    // Delete a Product with id
    router.delete("/:id", Category.delete);
  
    // Delete all Products
    router.delete("/", Category.deleteAll);

    app.use('/api/Category', router);
};