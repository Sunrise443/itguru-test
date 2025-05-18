Ext.define('First.view.main.list.ListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.list-cont',

    requires: [
        'First.view.main.card.Card',
    ],

    onItemSelected: function (sender, record) {
        Ext.create({
            xtype: "card",
            renderTo: Ext.getBody()
        })
    },

    redCell: function(value){
        if (value==0) {
            return '<span style="color: red;">' + value + '</span>'
        }
    },
});
