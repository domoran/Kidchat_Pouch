define(['knockout', 'text!./db.html','db'], function(ko, templateMarkup, db) {
  console.log("DB Component: ", db)

  function Db(params) {
    var self = this;
    this.message = ko.observable('Hello from the db component!');

    this.username = ko.observable(null);
    this.password = ko.observable(null);
    this.currentUser = ko.observable(null);
    this.isLogged = ko.observable(null);

    this.login = function () {
        db.login(this.username(), this.password())
        .then(function () {
            console.log("YEAH!", arguments);
            self.getSession();
        }, function (error) {
          console.log("Oh noes!");
        });
    }

    this.navText = ko.pureComputed(function () {
        if (self.currentUser() === null) return "Login"; else return "Hello, " + self.currentUser();
    });

    this.getSession();
  };

  Db.prototype.getSession = function () {
    var self = this;

    db.info().then(function (info) {
        db.getSession().then(function (response) {
          if (!response.userCtx.name) {
              console.log("I NO canhas Session!", response);
              self.currentUser(null);
              self.isLogged(false);
          } else {
              console.log("Icanhas Session!", response);
              self.currentUser(response.userCtx.name);
              self.isLogged(true);
          }
        });
    });
  };

  Db.prototype.error = function (msg) {
    console.log("Error in DB: " + msg);
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  Db.prototype.dispose = function() { };

  return { viewModel: Db, template: templateMarkup };

});
