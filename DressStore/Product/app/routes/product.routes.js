module.exports = app => {
    const Product = require("../controllers/product.controllers");
    var router = require("express").Router();
  
    // Create a new Product
    router.post("/", Product.create);
  
    // Retrieve all Products
    router.get("/", Product.findAll);
  
    // Retrieve all published Products
    router.get("/published", Product.findAllPublished);
  
    // Retrieve a single Product with id
    router.get("/:id", Product.findOne);
  
    // Update a Product with id
    router.put("/:id", Product.update);
  
    // Delete a Product with id
    router.delete("/:id", Product.delete);
  
    // Delete all Products
    router.delete("/", Product.deleteAll);

    app.use('/api/Product', router);
};