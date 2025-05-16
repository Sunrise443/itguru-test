/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('First.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

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
                    xtype: 'mainlist'
                }]
            })
        tabPanel.setActiveTab(tab);
    },

    onLogout: function() {
        Ext.Msg.confirm('Confirm', 'Are you okay', 'onConfirm', this)
        //change to logout
    }
});
