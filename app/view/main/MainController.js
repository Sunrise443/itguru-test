/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('First.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    requires: [
        'First.view.main.products.Products'
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
