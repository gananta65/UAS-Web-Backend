const sql = require("./db.js");

// constructor
const Admin = function(admin) {
  this.id_admin = admin.id_admin;
  this.nama_admin = admin.nama_admin;
  this.username = admin.username;
  this.password = admin.password;
};

Admin.create = (newAdmin, result) => {
  sql.query("INSERT INTO admin SET ?", newAdmin, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created admin: ", { id: res.insertId, ...newAdmin });
    result(null, { id: res.insertId, ...newAdmin });
  });
};

Admin.findById = (id, result) => {
  sql.query(`SELECT * FROM admin WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found admin: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found admin with the id
    result({ kind: "not_found" }, null);
  });
};

Admin.getAll = (id_admin, result) => {
  let query = "SELECT * FROM admin";

  if (id_admin) {
    query += ` WHERE title LIKE '%${id_admin}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("admin: ", res);
    result(null, res);
  });
};

Admin.getAllPublished = result => {
  sql.query("SELECT * FROM admin WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Admin.updateById = (id, admin, result) => {
  sql.query(
    "UPDATE admin SET nama_admin = ?, username = ?, password = ? WHERE id_admin = " + id,
    [admin.nama_admin, admin.username, admin.password],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated admin: ", { id: id, ...admin });
      result(null, { id: id, ...admin });
    }
  );
};

Admin.remove = (id, result) => {
  sql.query("DELETE FROM admin WHERE id_admin = " + id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    
    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

Admin.removeAll = result => {
  sql.query("DELETE FROM admin", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tutorials`);
    result(null, res);
  });
};

module.exports = Admin;