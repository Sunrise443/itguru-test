Ext.define('First.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    requires: [
        'First.view.main.products.Products',
        'First.view.main.login.Login'
    ],

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },

    //creates a new tab
    onItems: function() {
        var tabPanel = this.getView();
            tab = tabPanel.add({
                title: 'Товары',
                items: [{
                    xtype: 'products'
                }]
            })
        tabPanel.setActiveTab(tab);
    },

    onLogout: function() {
        localStorage.removeItem('FirstLoggedIn')

        this.getView().destroy();

        Ext.create({
            xtype: 'login',
            renderTo: Ext.getBody()
        })
    }
});
