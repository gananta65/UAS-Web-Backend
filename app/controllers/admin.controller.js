const Admin = require("../models/admin.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  
};

// Find a single Tutorial with a id
exports.findOne = (req, res) => {
  
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Admin.updateById(
      req.params.id,
      new Admin(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found admin with id ${req.params.id}.`
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
  
    // Create a admin
    const admin = new Admin({
      id_admin: req.body.id_admin,
      nama_admin: req.body.nama_admin,
      username: req.body.username,
      password: req.body.password || false
    });
  
    // Save admin in the database
    Admin.create(admin, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the admin."
        });
      else res.send(data);
    });
  };

  // Retrieve all admin from the database (with condition).
exports.findAll = (req, res) => {
    const id_admin = req.query.id_admin;
  
    Admin.getAll(id_admin, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving admin."
        });
      else res.send(data);
    });
  };
  
  exports.findAllPublished = (req, res) => {
    Admin.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving admin."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Admin.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found admin with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving admin with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };


  exports.delete = (req, res) => {
    Admin.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found admin with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete admin with id " + req.params.id
          });
        }
      } else res.send({ message: `Tutorial was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Admin.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all admin."
        });
      else res.send({ message: `All Tutorials were deleted successfully!` });
    });
  };





