define(['knockout', 'text!./login-nav.html','cls/db/db', 'cls/user/user'], function(ko, templateMarkup, databases,User) {
  var db = databases.db;

  console.log("DB Component: ", db, User);

  // TBD: remove
  window.db = db;

  function LoginNav(params) {
    var self = this;
    this.username = ko.observable(null);
    this.password = ko.observable(null);

    this.currentUser = params.currentUser || ko.observable(null);

    // used for differentiating the initial state, where we do not know if we have a session yet
    this.isLogged = ko.observable(null);

    this.login = function () {
        db.login(self.username(), self.password())
        .then(function () {
            self.getSession();
        }, function (error) {
        });
    }

    this.logout = function () {
      db.logout()
      .then(function () {
          self.getSession();
      }, function (error) {
      })
    }

    this.navText = ko.pureComputed(function () {
        if (self.currentUser() === null) return "Login"; else return "Hello, " + self.currentUser().name;
    });

    this.getSession();

  };

  LoginNav.prototype.getSession = function () {
    var self = this;
    console.log("Getting Session!");
    db.info().then(function (info) {
        db.getSession().then(function (response) {
          console.log("response", response);
          if (!response.userCtx.name) {
              self.isLogged(false);
              self.currentUser(null);
          } else {
              console.log(response);
              self.currentUser(new User(response.userCtx.name,response.userCtx.roles));
              self.isLogged(true);
          }
        }, function(error) {
           console.log("Error getting session", error);
        });
    })
    .catch(function () {
        self.isLogged(false);
        self.currentUser(null);
     });
  };

  LoginNav.prototype.error = function (msg) {
    console.log("Error in LoginNav: " + msg);
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  LoginNav.prototype.dispose = function() { };

  return { viewModel: LoginNav, template: templateMarkup };

});
