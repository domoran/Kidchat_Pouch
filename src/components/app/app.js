define(['knockout', 'text!./app.html'], function(ko, template) {
  window.ko = ko; // TBD: remove

  function App(params) {
    // This viewmodel doesn't do anything except pass through the 'route' parameter to the view.
    this.route = params.route;

    this.currentUser = ko.observable(null);
    window.app = this; // TBD: remove
  }

  return { viewModel: App, template: template };
});
