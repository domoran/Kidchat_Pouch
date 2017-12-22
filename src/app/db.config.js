define(['pouchdb','pouchdb.auth'], function( PouchDB, PouchAuth ) {
  console.log("initializing db!");
  PouchDB.plugin(PouchAuth);
  return new PouchDB('http://192.168.113.136:5984/kidchat',{skip_setup: true});
});
