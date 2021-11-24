const fs = require('fs');

module.exports = class Population {

  constructor(id) {
    this.id = id
  }

  static fetchAll() {
    return JSON.parse(fs.readFileSync("./model/db.json"));
  }

  static getByYear(year) {
    const db = JSON.parse(fs.readFileSync("./model/db.json"));
    return db[1].filter(record => record.date == year);
  }

  static getByRange(year1, year2) {
    const db = JSON.parse(fs.readFileSync("./model/db.json"));
    return db[1].filter(record => record.date >= year1 && record.date <= year2);
  }

}