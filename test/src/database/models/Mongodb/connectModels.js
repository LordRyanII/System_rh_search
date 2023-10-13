const mongoose = require('mongoose');

module.exports = class Database {
  constructor(chave) {
    this._connect();
    this.database = chave;
  }
  
  _connect() {
    mongoose.connect(this.database, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch(err => {
        console.error('Database connection error');
      });
  }
}
