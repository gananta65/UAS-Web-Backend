const sql = require("./db.js");

// constructor
const Karyawan = function(karyawan) {
  this.id_karyawan = karyawan.id_karyawan;
  this.nama_karyawan = karyawan.nama_karyawan;
  this.shift = karyawan.shift;
};

Karyawan.create = (newKaryawan, result) => {
  sql.query("INSERT INTO karyawan SET ?", newKaryawan, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created karyawan: ", { id: res.insertId, ...newKaryawan });
    result(null, { id: res.insertId, ...newKaryawan });
  });
};

Karyawan.findById = (id, result) => {
  sql.query(`SELECT * FROM karyawan WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found karyawan: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found admin with the id
    result({ kind: "not_found" }, null);
  });
};

Karyawan.getAll = (id_admin, result) => {
  let query = "SELECT * FROM karyawan";

  if (id_admin) {
    query += ` WHERE title LIKE '%${id_karyawan}%'`;
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

Karyawan.getAllPublished = result => {
  sql.query("SELECT * FROM karyawan WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Karyawan.updateById = (id, karyawan, result) => {
  sql.query(
    "UPDATE karyawan SET nama_karyawan = ?, shift = ? WHERE id_karyawan = " + id,
    [karyawan.nama_karyawan, karyawan.shift,],
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

      console.log("updated admin: ", { id: id, ...karyawan });
      result(null, { id: id, ...karyawan });
    }
  );
};

Karyawan.remove = (id, result) => {
  sql.query("DELETE FROM karyawan WHERE id_karyawan = " + id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    
    console.log("deleted karyawan with id: ", id);
    result(null, res);
  });
};

Karyawan.removeAll = result => {
  sql.query("DELETE FROM karyawan", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} karyawan`);
    result(null, res);
  });
};

module.exports = Karyawan;