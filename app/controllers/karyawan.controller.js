const Karyawan = require("../models/karyawan.model.js");

// Create and Save a new 
exports.create = (req, res) => {
  
};

// Retrieve all  from the database (with condition).
exports.findAll = (req, res) => {
  
};

// Find a single  with a id
exports.findOne = (req, res) => {
  
};

// find all published 
exports.findAllPublished = (req, res) => {
  
};

// Update a identified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Karyawan.updateById(
      req.params.id,
      new Karyawan(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found karyawan with id ${req.params.id}.`
            });
          } else {
            res.status(200).send({
              message: "Success updated data id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
};

// Delete a  with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all  from the database.
exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a karyawan
    const karyawan = new Karyawan({
      id_karyawan: req.body.id_karyawan,
      nama_karyawan: req.body.nama_karyawan,
      shift: req.body.shift || false
    });
  
    // Save admin in the database
    Karyawan.create(karyawan, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the karyawan."
        });
      else res.send(data);
    });
  };

  // Retrieve all karyawan from the database (with condition).
exports.findAll = (req, res) => {
    const id_karyawan = req.query.id_karyawan; 
    
    Karyawan.getAll(id_karyawan, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving karyawan."
        });
      else res.send(data);
    });
  };
  
  exports.findAllPublished = (req, res) => {
    Karyawan.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving karyawan."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Karyawan.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found karyawan with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving karyawan with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };


  exports.delete = (req, res) => {
    Karyawan.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Karyawan with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Karyawan with id " + req.params.id
          });
        }
      } else res.send({ message: `deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Karyawan.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all karyawan."
        });
      else res.send({ message: `All were deleted successfully!` });
    });
  };





