define(['pouchdb','pouchdb.auth'], function( PouchDB, PouchAuth ) {
  console.log("initializing db!");
  PouchDB.plugin(PouchAuth);

  var base = "http://127.0.0.1:5984/";

  var db = new PouchDB(base + 'kidchat',{skip_setup: true});
  var userdb = new PouchDB(base + '_users',{skip_setup: true});

  var allUsers = function () {
    return userdb.allDocs({
                  include_docs: true,
                  attachments: true,
                  startkey: 'org.couchdb.user:',
                  endkey: 'org.couchdb.user:\uffff'
                });
  };

  return {
        'db': db,
        'users' : userdb,
        'getUsers' : allUsers
  };
});
