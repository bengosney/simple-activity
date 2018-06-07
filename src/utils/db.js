import PouchDB from 'pouchdb';
import find from 'pouchdb-find';

PouchDB.plugin(find);

//const dbName = 'tweatpouch';
const dbName = 'kittens';
const localDB = new PouchDB(dbName);
const remoteDB = new PouchDB(`http://localhost:5984/${dbName}`);

localDB.sync(remoteDB, {
    live: true,
    retry: true
}).on('change', function (change) {
    console.log('yo, something changed!');
}).on('paused', function (info) {
    // paused
}).on('active', function (info) {
    // active
}).on('error', function (err) {
    console.log('totally unhandled error (shouldn\'t happen)');
});

localDB.createIndex({
  index: {fields: ['type']}
});

export default localDB;
/*
export default class db {
    localDB() {
	return localDB;
    }

    remote() {
	return remoteDB;
    }
}
*/
//db.local = localDB;
//db.remote = remoteDB;

