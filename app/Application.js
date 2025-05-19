Ext.define('First.Application', {
    extend: 'Ext.app.Application',

    name: 'First',

    stores: [
        'Items'
    ],

    requires: [
        'First.view.main.login.Login',
        'First.view.main.Main'
    ],

    launch: function () {
        localStorage.removeItem('FirstLoggedIn')
        var loggedIn = localStorage.getItem('FirstLoggedIn') === 'true';
        Ext.create({
            xtype: loggedIn ? 'app-main' : 'login',
            renderTo: Ext.getBody()
        });
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
        localStorage.removeItem('FirstLoggedIn')
    }
});
