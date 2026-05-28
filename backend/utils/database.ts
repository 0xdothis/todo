import { Db, MongoClient } from 'mongodb';

const mongoClient = new MongoClient('INPUT YOUR CONNECTION URL HERE');

let _db: Db;

export const mongoConnect = (cb: () => void) => {
  mongoClient
    .connect()
    .then((client) => {
      console.log('Connected');
      _db = client.db();
      cb();
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const getDb = () => {
  if (_db) {
    return _db;
  }

  throw 'No database found!';
};
