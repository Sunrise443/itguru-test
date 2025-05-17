Ext.define('First.view.main.products.ProductsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.products',

    onIDFilter: function(field, event) {
        var grid = field.up('container').down('grid')
        var store = grid.getStore()
        if (event.getKey() === Ext.EventObject.ENTER && field.getValue() != '') {
            store.addFilter({
                property: 'ID',
                id: 'idFilter',
                value: field.getValue()
            })
        } else if (event.getKey() === Ext.EventObject.ENTER) {
            store.removeFilter('idFilter')
        }
    },

    onDescFilter: function(field, event) {
        var grid = field.up('container').down('grid')
        var store = grid.getStore()
        if (event.getKey() === Ext.EventObject.ENTER && field.getValue() != '') {
            store.addFilter({
                id: 'descFilter',
                // фильтр по наименованию и описанию (для фильтра только по описанию удалить descMatch)
                filterFn: function(record) {
                    var descMatch = record.get('Description') == field.getValue()
                    var nameMatch = record.get('Name').includes(field.getValue())
                    return descMatch || nameMatch
                },
                caseSensitive: false
            })
        } else if (event.getKey() === Ext.EventObject.ENTER) {
            store.removeFilter('descFilter')
        }
    }
});
