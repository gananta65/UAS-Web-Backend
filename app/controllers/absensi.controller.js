const Absensi = require("../models/absensi.model.js");

// Create and Save 
exports.create = (req, res) => {
  
};

// Retrieve all from the database (with condition).
exports.findAll = (req, res) => {

};

// Find a single with a id
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
  
    Absensi.updateById(
      req.params.id,
      new Absensi(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Absensi with id ${req.params.id}.`
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

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a absensi
    const absensi = new Absensi({
      id_absensi: req.body.id_absensi,
      id_karyawan: req.body.id_karyawan,
      tanggal: req.body.tanggal,
      jam: req.body.tanggal,
      reason: req.body.reason,
      status: req.body.status || false
    });
  
    // Save admin in the database
    Absensi.create(absensi, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the absensi."
        });
      else res.send(data);
    });
  };

  // Retrieve all from the database (with condition).
exports.findAll = (req, res) => {
    const id_absensi = req.query.id_absensi;
  
    Absensi.getAll(id_absensi, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving absensi."
        });
      else res.send(data);
    });
  };
  
  exports.findAllPublished = (req, res) => {
    Absensi.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
  };

   exports.findOne = (req, res) => {
     Absensi.findById(req.params.id, (err, data) => {
       if (err) {
         if (err.kind === "not_found") {
           res.status(404).send({
             message: `Not found absensi with id ${req.params.id}.`
           });
         } else {
           res.status(500).send({
             message: "Error retrieving absensi with id " + req.params.id
           });
         }
       } else res.send(data);
     });
   };


  exports.delete = (req, res) => {
    Absensi.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found absensi with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete absensi with id " + req.params.id
          });
        }
      } else res.send({ message: `absensi was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Absensi.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      else res.send({ message: `All absensi were deleted successfully!` });
    });
  };





