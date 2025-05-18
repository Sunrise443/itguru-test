Ext.define('First.view.main.list.ListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.list-cont',

    requires: [
        'Ext.window.Window',

        'First.view.main.list.Card',
    ],

    onItemSelected: function (grid, record) {
        this.createDialog(record)
    },

    redCell: function(value){
        if (value==0) {
            return '<span style="color: red;">' + value + '</span>'
        }
    },

    createDialog: function(record) {
        var view = this.getView();

        this.isEdit = !!record;
        this.dialog = Ext.create({
            xtype: 'card',
            viewModel: {
                data: {
                    name: record.get('Name'),
                    id: record.get('ID')-1,
                    desc: record.get('Description'),
                    price: record.get('Price'),
                    amount: record.get('Amount')
                }
            }
        })
    },

    onSave: function() {
        var form = this.getView().down('form');
        var idField = form.down('[name=id]');
        var priceField = form.down('[name=price]');
        var amountField = form.down('[name=amount]');

        var id = idField.getValue();
        var price = priceField.getValue();
        var amount = amountField.getValue();

        var store = Ext.data.StoreManager.lookup('list');
        var record = store.getAt(id);
        if (price < 0 || amount < 0) {
            Ext.Msg.alert("Ошибка!", "Неверные данные")
        } else if (price != record.get('Price') || amount != record.get('Amount')) {
            Ext.Msg.alert('Данные были изменены')
            record.set('Price', price)
            record.set('Amount', amount)
        }
        this.getView().destroy()
    },

    onCancel: function() {
        this.getView().destroy()
    }

});
