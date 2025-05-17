Ext.define('First.view.main.list.ListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.list',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    redCell: function(value){
        if (value==0) {
            return '<span style="color: red;">' + valuer + '</span>'
        }
    },
});
