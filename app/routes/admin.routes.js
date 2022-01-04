module.exports = app => {
    const admin = require("../controllers/admin.controller.js");
  
    var router = require("express").Router();
    // Create a new 
    router.post("/admin", admin.create);
  
    // Retrieve all 
    router.get("/admin", admin.findAll);
  
    // Retrieve all published 
    router.get("/published", admin.findAllPublished);
  
    // Retrieve a single  with id
    router.get("/admin/:id", admin.findOne);
  
    // Update a  with id
    router.put("/admin/:id", admin.update);
  
    // Delete a  with id
    router.delete("/admin/:id", admin.delete);
  
    // Delete all 
    router.delete("/", admin.deleteAll);
  
    app.use('/api', router);
  };