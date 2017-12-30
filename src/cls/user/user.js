define([], function(  ) {
    return function (name, roles) {
        var self = this;

        this.name = name;
        this.roles = roles;

        this.isAdmin = function () {
           return self.roles.indexOf('_admin') >= 0;
        }
    };
});
