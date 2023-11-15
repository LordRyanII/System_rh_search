require('dotenv').config()
const mongoose = require('mongoose');

module.exports = class Database {
  constructor(chave) {
    this.chave = chave;
  }
  
  connect() {
    const database = mongoose.connect(this.chave, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('MongoDb connection successful');
        console.error('---------------------------------------------------------');
      })
      .catch((e) => {
        console.error('----------------------------------------------------------');
        console.error('MongoDb connection error' + e);
        console.error('----------------------------------------------------------');
      });
  }

  closed() {
    this.database.disconnect()
  }
}
