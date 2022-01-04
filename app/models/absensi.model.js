const sql = require("./db.js");

// constructor
const Absensi = function(absensi) {
  this.id_absensi = absensi.id_absensi;
  this.id_karyawan = absensi.id_karyawan;
  this.tanggal = absensi.tanggal;
  this.jam = absensi.jam;
  this.reason = absensi.reason;
  this.status = absensi.status;
};

Absensi.create = (newAbsensi, result) => {
  sql.query("INSERT INTO absensi SET ?", newAbsensi, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created absensi: ", { id: res.insertId, ...newAbsensi });
    result(null, { id: res.insertId, ...newAbsensi });
  });
};

Absensi.findById = (id, result) => {
  sql.query(`SELECT * FROM absensi WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found absensi: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found admin with the id
    result({ kind: "not_found" }, null);
  });
};

Absensi.getAll = (id_absensi, result) => {
  let query = "SELECT * FROM absensi";

  if (id_absensi) {
    query += ` WHERE title LIKE '%${id_absensi}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("absensi: ", res);
    result(null, res);
  });
};

Absensi.getAllPublished = result => {
  sql.query("SELECT * FROM absensi WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("absensi: ", res);
    result(null, res);
  });
};

Absensi.updateById = (id, absensi, result) => {
  sql.query(
    "UPDATE absensi SET id_karyawan = ?, tanggal = ?, jam = ?, reason = ?, status = ? WHERE id_absensi = " + id,
    [absensi.id_karyawan, absensi.tanggal, absensi.jam, absensi.reason, absensi.status],
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

      console.log("updated absensi: ", { id: id, ...absensi });
      result(null, { id: id, ...absensi });
    }
  );
};

Absensi.remove = (id, result) => {
  sql.query("DELETE FROM absensi WHERE id_absensi = " + id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    
    console.log("deleted absensi with id: ", id);
    result(null, res);
  });
};

Absensi.removeAll = result => {
  sql.query("DELETE FROM absensi", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} absensi`);
    result(null, res);
  });
};

module.exports = Absensi;