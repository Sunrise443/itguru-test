Ext.define('First.view.main.card.CardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.card-cont',

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
        if (price !== record.get('Price') || amount !== record.get('Amount')) {
            Ext.Msg.alert('Данные были изменены')
            record.set('Price', price)
            record.set('Amount', amount)
        }
        this.getView().destroy()
    },

    onCancel: function() {
        this.getView().destroy()
    }
})