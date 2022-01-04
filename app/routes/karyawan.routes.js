module.exports = app => {
    const karyawan = require("../controllers/karyawan.controller.js");
  
    var router = require("express").Router();
  
    // Create a new 
    router.post("/karyawan", karyawan.create);
  
    // Retrieve all 
    router.get("/karyawan", karyawan.findAll);
  
    // Retrieve all published 
    router.get("/published", karyawan.findAllPublished);
  
    // Retrieve a single  with id
    router.get("/karyawan/:id", karyawan.findOne);
  
    // Update a  with id
    router.put("/karyawan/:id", karyawan.update);
  
    // Delete a  with id
    router.delete("/karyawan/:id", karyawan.delete);
  
    // Delete all 
    router.delete("/", karyawan.deleteAll);
  
    app.use('/api', router);
  };