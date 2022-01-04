module.exports = app => {
    const absensi = require("../controllers/absensi.controller.js");
  
    var router = require("express").Router();
  
    // Create a new 
    router.post("/absensi", absensi.create);
  
    // Retrieve all 
    router.get("/absensi", absensi.findAll);
  
    // Retrieve all published 
    router.get("/published", absensi.findAllPublished);
  
    // Retrieve a single  with id
    router.get("/admin/:id", absensi.findOne);
  
    // Update a  with id
    router.put("/absensi/:id", absensi.update);
  
    // Delete a  with id
    router.delete("/absensi/:id", absensi.delete);
  
    // Delete all 
    router.delete("/", absensi.deleteAll);
  
    app.use('/api', router);
  };