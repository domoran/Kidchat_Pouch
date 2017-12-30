define({
    // Pages - knockout components that serve as pages
    pages: [
        // [Scaffolded pages will be inserted here. To retain this feature, don't remove this comment.]

		{ name: 'admin', path: 'pages/admin/admin' },
        { name: 'home', path: 'pages/home/home' },
        { name: 'teams', path: 'pages/teams/teams' }
    ],
    // Components - knockout components intended as parts of pages, a.k.a. components
    components: [
        // [Scaffolded components will be inserted here. To retain this feature, don't remove this comment.]

		{ name: 'login-nav', path: 'components/login-nav/login-nav' },
        { name: 'nav-bar', path: 'components/nav-bar/nav-bar' },
        { name: 'app', path: 'components/app/app' }

    ]
});
