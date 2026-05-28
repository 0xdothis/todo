import { Db, MongoClient } from 'mongodb';

const mongoClient = new MongoClient(
  'mongodb+srv://todo:todo@cluster0.qpiuxc5.mongodb.net/todo_db?appName=Cluster0',
);

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
