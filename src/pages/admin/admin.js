define(['knockout', 'text!./admin.html', 'cls/db/db'], function(ko, templateMarkup, db) {

  function Users(params) {
    var self = this;
    if (!params.currentUser || !ko.isObservable(params.currentUser)) throw "Missing currentUser observable param for user component!";

    this.currentUser = params.currentUser;

    this.error = ko.observable(null);
    this.message = ko.observable(null);

    this.users = ko.observableArray([]);

    this.username = ko.observable(null);
    this.password = ko.observable(null);

    this.configureUser = function (user) {
       console.log("Configuring User", user);
       var a = db.users.get(user.id);

       var b = a
       .then(function (user) {
         console.log("Adding Role", user);
          user.roles = ['kidchat-user'];
          return db.users.put(user);
       }).catch(function (err) {
         console.log("Error updating user: ", err);
       });

       var c = b.then(function () {
          console.log("User updated!");
       }).catch(function (err) {
          console.log("WTF?", err);
       });

       return c;
    }

    this.newUser = function () {
        console.log("Creating user!");
        if (this.username() && this.password()) {
            db.users.signUp(this.username(), this.password())
            .then(self.configureUser)
            .then(self.update)
            .catch(function (msg) { self.error(msg); self.update(); });
        }
    }

    this.removeUser = function(user) {
      console.log("deleting", user);
      db.users.remove(user.doc)
      .then(self.update)
      .catch(function (msg) { self.error(msg); self.update(); });
    }

    this.update = function () {
        var cu = self.currentUser();
        if (cu && cu.isAdmin()) {
            db.getUsers().then(
              function(users) {
                console.log("Users", users);
                self.error(null);
                self.users(users.rows || []);
            })
            .catch(function (err) {
                console.log(err);
                self.error("Could not read users!" + (err.reason ||  "Make sure you are logged in as admin!"));
            });
        } else {
            console.log("User Page: Not an admin user or no current user!");
            self.error('Please login as admin to view this page!');
            self.users(null);
        }
    }

    this.currentUser.subscribe(this.update); // end subscribe
    this.update();
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  Users.prototype.dispose = function() { };

  return { viewModel: Users, template: templateMarkup };

});
